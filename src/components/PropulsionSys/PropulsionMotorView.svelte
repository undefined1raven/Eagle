<script lang="ts">
	import { onMount } from 'svelte';
	import { getTransition } from '../../fn/getTransisitions';
	import globalStyle from '../../stores/globalStyles';
	import { onKeyDown, onKeyUp } from '../../stores/keyEvents';
	import Box from '../common/Box.svelte';
	import Button from '../common/Button.svelte';
	import Label from '../common/Label.svelte';
	import ProgressBar from '../common/ProgressBar.svelte';
	import MotorConfigDeco from '../deco/MotorConfigDeco.svelte';

	let containerConfig = { containerWidth: 0, containerHeight: 0 };
	let motorLabel = 'M1';
	let motorConfigID = 'topLeft';
	let motorWiringLabel = '[D8 Black]';
	let throttleLevel = 0;

	//state
	type BaseState = 'active' | 'ready';
	let baseState: BaseState = 'ready';

	let isArmed: boolean = false;

	$: if (baseState === 'ready') {
		//reset isArmed on baseState toggle
		isArmed = false;
		controlMode = 'manual';
		isLocked = true;
	}

	type ControlModes = 'manual' | 'flight';
	let controlMode: ControlModes = 'manual';

	let isLocked: boolean = true;

	$: if (controlMode === 'flight') {
		//lock controls while in flight mode
		isLocked = true;
	}

	$: if (isArmed === false) {
		//reset controls on isArmed toggle
		isLocked = true;
		controlMode = 'flight';
	}

	//UI State
	$: activeButtonStyle = {
		color:
			baseState === ('ready' as BaseState) ? $globalStyle.activeColor : $globalStyle.successColor,
		label: baseState === ('ready' as BaseState) ? 'Ready' : 'Active'
	};

	$: modeButtonStyle = {
		activeColor: isArmed ? $globalStyle.activeColor : $globalStyle.inactiveColor,
		monoColor: isArmed ? $globalStyle.activeMono : $globalStyle.inactiveMono,
		label: controlMode === ('manual' as ControlModes) ? 'Manual' : 'FLT CTRL'
	};

	function getLockButtonStyle(isArmed: boolean, controlMode: ControlModes, isLocked: boolean) {
		if (isArmed === true) {
			if (controlMode === 'manual') {
				return isLocked === true
					? { activeColor: $globalStyle.secondaryColor, monoColor: $globalStyle.secondaryMono }
					: { activeColor: $globalStyle.activeColor, monoColor: $globalStyle.activeMono };
			} else {
				return { activeColor: $globalStyle.inactiveColor, monoColor: $globalStyle.inactiveMono };
			}
		} else {
			return { activeColor: $globalStyle.inactiveColor, monoColor: $globalStyle.inactiveMono };
		}
	}

	$: lockButtonStyle = getLockButtonStyle(isArmed, controlMode, isLocked);

	let isThrottlingUp = false;
	let isThrottlingDown = false;
	let throtleChangeInterval;

	onMount(() => {
		throtleChangeInterval = setInterval(() => {
			if (
				isArmed === true &&
				baseState === 'active' &&
				isLocked === false &&
				controlMode === 'manual'
			) {
				if (throttleLevel < 100 && isThrottlingUp === true) {
					throttleLevel++;
				}
				if (throttleLevel > 0 && isThrottlingDown === true) {
					throttleLevel--;
				}
			}
		}, 100);
	});
	onKeyDown.subscribe((onkeydown) => {
		if (
			onkeydown.empty === false &&
			baseState === 'active' &&
			isArmed === true &&
			controlMode === 'manual' &&
			isLocked === false
		) {
			if (
				(onkeydown?.event?.key.toLowerCase() === 'w' || onkeydown?.event?.keyCode === 38) &&
				isThrottlingUp === false
			) {
				isThrottlingDown = false;
				isThrottlingUp = true;
			}
			if (
				(onkeydown?.event?.key.toLowerCase() === 's' || onkeydown?.event?.keyCode === 40) &&
				isThrottlingDown === false
			) {
				isThrottlingUp = false;
				isThrottlingDown = true;
			}
		}
	});

	onKeyUp.subscribe((onkeyup) => {
		if (onkeyup?.event?.key.toLowerCase() === 'w' || onkeyup?.event?.keyCode === 38) {
			isThrottlingUp = false;
		}
		if (onkeyup?.event?.key.toLowerCase() === 's' || onkeyup?.event?.keyCode === 40) {
			isThrottlingDown = false;
		}
		if (onkeyup.event?.code.toLowerCase() === 'space') {
			isThrottlingDown = false;
			isThrottlingUp = false;
			throttleLevel = 0;
			baseState = 'ready';
		}
	});

	export { containerConfig, motorConfigID, motorLabel, motorWiringLabel, throttleLevel };
</script>

<Box width="100%" height="100%">
	<Box
		transitions={getTransition(1)}
		figmaImportConfig={containerConfig}
		figmaImport={{ desktop: { top: 12, left: 12, width: 45, height: 45 } }}
	>
		<MotorConfigDeco
			width="100%"
			height="100%"
			topLeft={'topLeft' === motorConfigID}
			topRight={'topRight' === motorConfigID}
			bottomLeft={'bottomLeft' === motorConfigID}
			bottomRight={'bottomRight' === motorConfigID}
			primaryColor={isArmed && baseState === 'active'
				? $globalStyle.errorColor
				: $globalStyle.activeColor}
		></MotorConfigDeco>
	</Box>
	<Label
		text={motorLabel}
		desktopFont={$globalStyle.mediumDesktopFont}
		figmaImportConfig={containerConfig}
		figmaImport={{ desktop: { top: 12, left: 69 } }}
	></Label>
	<Label
		text={motorWiringLabel}
		desktopFont={$globalStyle.smallDesktopFont}
		figmaImportConfig={containerConfig}
		figmaImport={{ desktop: { top: 36, left: 69 } }}
	></Label>
	<Box
		transitions={getTransition(3)}
		figmaImport={{ desktop: { top: 92, left: 12, width: 552, height: 10 } }}
		figmaImportConfig={containerConfig}
	>
		<ProgressBar
			width="100%"
			height="100%"
			progress={throttleLevel}
			primaryColor={$globalStyle.activeColor}
			isInteractive={false}
			secondaryColor={$globalStyle.secondaryColor}
		></ProgressBar>
	</Box>
	<Label
		transitions={getTransition(3)}
		text="{throttleLevel}%"
		desktopFont={$globalStyle.smallDesktopFont}
		figmaImportConfig={containerConfig}
		figmaImport={{ desktop: { top: 71, left: 12 } }}
	></Label>
	<Label
		transitions={getTransition(4)}
		text="Status"
		desktopFont={$globalStyle.verySmallDesktopFont}
		figmaImportConfig={containerConfig}
		figmaImport={{ desktop: { top: 121, left: 12 } }}
	></Label>
	<Button
		onClick={() => {
			if (baseState === 'active') {
				baseState = 'ready';
				isArmed = false; //double redundancy
			} else {
				baseState = 'active';
			}
		}}
		transitions={getTransition(5)}
		hoverOpacityMin={0}
		hoverOpacityMax={20}
		label={activeButtonStyle.label}
		color={activeButtonStyle.color}
		backgroundColor={activeButtonStyle.color}
		borderColor={activeButtonStyle.color}
		desktopFont={$globalStyle.smallDesktopFont}
		figmaImportConfig={containerConfig}
		figmaImport={{ desktop: { top: 136 + 10, left: 12, width: 214, height: 47 } }}
	></Button>
	<Button
		onClick={() => {
			if (baseState === 'active') {
				isArmed = !isArmed;
			}
		}}
		transitions={getTransition(6)}
		hoverOpacityMin={0}
		hoverOpacityMax={20}
		label={isArmed ? 'ARMED' : 'Safe'}
		color={isArmed ? $globalStyle.errorColor : $globalStyle.successColor}
		backgroundColor={isArmed ? $globalStyle.errorColor : $globalStyle.successColor}
		borderColor={isArmed ? $globalStyle.errorColor : $globalStyle.successColor}
		desktopFont={$globalStyle.smallDesktopFont}
		figmaImportConfig={containerConfig}
		figmaImport={{ desktop: { top: 197 + 10, left: 12, width: 214, height: 47 } }}
	></Button>

	<Button
		onClick={() => {
			if (isArmed === true && baseState === 'active') {
				if (controlMode === 'manual') {
					controlMode = 'flight';
				} else {
					controlMode = 'manual';
				}
			}
		}}
		transitions={getTransition(5)}
		hoverOpacityMin={0}
		hoverOpacityMax={isArmed ? 20 : 0}
		label={modeButtonStyle.label}
		color={modeButtonStyle.monoColor}
		backgroundColor={modeButtonStyle.activeColor}
		borderColor={modeButtonStyle.activeColor}
		desktopFont={$globalStyle.smallDesktopFont}
		figmaImportConfig={containerConfig}
		figmaImport={{ desktop: { top: 136 + 10, left: 242, width: 214, height: 47 } }}
	></Button>
	<Button
		onClick={() => {
			if (controlMode === 'manual' && isArmed === true && baseState === 'active') {
				isLocked = !isLocked;
			} else {
				isLocked = true;
			}
		}}
		transitions={getTransition(6)}
		hoverOpacityMin={0}
		hoverOpacityMax={isArmed ? 20 : 0}
		label={isLocked ? 'Locked' : 'Unlocked'}
		color={lockButtonStyle.monoColor}
		backgroundColor={lockButtonStyle.activeColor}
		borderColor={lockButtonStyle.activeColor}
		desktopFont={$globalStyle.smallDesktopFont}
		figmaImportConfig={containerConfig}
		figmaImport={{ desktop: { top: 197 + 10, left: 242, width: 214, height: 47 } }}
	></Button>

	<Label
		transitions={getTransition(4)}
		text="Controls"
		desktopFont={$globalStyle.verySmallDesktopFont}
		figmaImportConfig={containerConfig}
		figmaImport={{ desktop: { top: 121, left: 242 } }}
	></Label>
</Box>
