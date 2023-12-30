<script lang="ts">
	import { SvelteComponent, onMount } from 'svelte';
	import LoginDock from '../components/LoginDock.svelte';
	import Label from '../components/common/Label.svelte';
	import { loggedIn } from '../stores/loggedIn';
	import { emit } from '../fn/realtime';
	import { RTC } from '../stores/RTC';
	import { VID, password } from '../stores/loginCreds';
	import Box from '../components/common/Box.svelte';
	import globalStyle from '../stores/globalStyles';
	import { lastPing } from '../stores/lastPing';
	import DateInput from '../components/common/DateInput.svelte';
	import VultureFullDeco from '../components/deco/VultureFullDeco.svelte';
	import HorizontalLine from '../components/common/HorizontalLine.svelte';
	import List from '../components/common/List.svelte';
	import ListItem from '../components/common/ListItem.svelte';
	import Button from '../components/common/Button.svelte';
	import DecoX from '../components/deco/DecoX.svelte';
	import { fade } from 'svelte/transition';
	import { getTransition } from '../fn/getTransisitions';
	import FltComputerShutdownDeco from '../components/deco/FLTComputerShutdownDeco.svelte';
	import FltComputerRestartDeco from '../components/deco/FLTComputerRestartDeco.svelte';
	import FltProcessRestartDeco from '../components/deco/FLTProcessRestartDeco.svelte';
	import PropulsionSystemView from '../components/PropulsionSys/PropulsionSystemView.svelte';
	import { onKeyDown, onKeyPress, onKeyUp } from '../stores/keyEvents';
	import DynamicsSystemView from '../components/DynamicsSys/DynamicsSystemView.svelte';
	let showDecoGrid = false;
	onMount(() => {
		setTimeout(() => {
			showDecoGrid = true;
		}, 20);
		setInterval(() => {
			if (Math.abs(Date.now() - $lastPing) > 1000) {
				isConnectionActive = false;
				liveIndicatorColor = $globalStyle.errorColor;
			}
		}, 1000);
	});

	const systemsDock = { containerWidth: 259, containerHeight: 1002 };

	let liveIndicatorColor = $globalStyle.inactiveColor;
	let isConnectionActive = true;
	lastPing.subscribe((lp) => {
		liveIndicatorColor = $globalStyle.successColor;
		isConnectionActive = true;
		setTimeout(() => {
			liveIndicatorColor = $globalStyle.inactiveColor;
		}, 400);
	});
	type System = 'none' | 'propulsion' | 'power' | 'config' | 'dynamics';
	type SystemArrayComponent = { id: System; displayName: string; component: any };
	let selectedSys: System = 'none';
	let systemArray: SystemArrayComponent[] = [
		{ id: 'propulsion', displayName: 'Propulsion', component: PropulsionSystemView },
		{ id: 'power', displayName: 'Power', component: Label },
		{ id: 'dynamics', displayName: 'Dynamics', component: DynamicsSystemView },
		{ id: 'config', displayName: 'Config', component: Label }
	];

	function getComponentFromSystemID(sysID) {
		const sysObj = systemArray.find((e) => e.id === sysID);
		if (sysObj?.component !== undefined) {
			return sysObj?.component;
		} else {
			return Label;
		}
	}
</script>

<svelte:body
	on:keydown={(e) => {
		onKeyDown.set({ empty: false, event: e });
	}}
	on:keyup={(e) => {
		onKeyUp.set({ empty: false, event: e });
	}}
	on:keypress={(e) => {
		onKeyPress.set({ empty: false, event: e });
	}}
/>
{#if $loggedIn === false}
	<LoginDock></LoginDock>
{:else}
	<Box
		backgroundColor="{$globalStyle.activeColor}10"
		figmaImport={{ desktop: { top: 39, left: 39, width: 259, height: 1002 } }}
	>
		<Box
			transitions={getTransition(3)}
			backgroundColor={liveIndicatorColor}
			figmaImportConfig={systemsDock}
			figmaImport={{ desktop: { top: 83, left: 106, width: 15, height: 3 } }}
		></Box>
		<Label
			transitions={getTransition(2)}
			desktopFont={$globalStyle.smallDesktopFont}
			text={isConnectionActive === false ? 'No Signal' : 'Connected'}
			color={isConnectionActive === false ? $globalStyle.errorColor : $globalStyle.successColor}
			backgroundColor="{isConnectionActive === false
				? $globalStyle.errorColor
				: $globalStyle.successColor}20"
			figmaImportConfig={systemsDock}
			figmaImport={{ desktop: { top: 52, left: 106, width: 110, height: 23 } }}
		></Label>
		<Label
			transitions={getTransition(1)}
			figmaImportConfig={systemsDock}
			figmaImport={{ desktop: { top: 22, left: 106 } }}
			desktopFont={$globalStyle.smallDesktopFont}
			text="Vulture XRN-324"
		></Label>
		<Box
			transitions={getTransition(2)}
			figmaImportConfig={systemsDock}
			figmaImport={{ desktop: { top: 22, left: 20, width: 52, height: 63 } }}
			><VultureFullDeco
				width="100%"
				height="100%"
				color={isConnectionActive ? $globalStyle.successColor : $globalStyle.errorColor}
			></VultureFullDeco></Box
		>
		<HorizontalLine
			transitions={getTransition(3)}
			color={$globalStyle.activeColor}
			figmaImportConfig={systemsDock}
			figmaImport={{ desktop: { top: 96, left: '0', width: '100%', height: 1.2 } }}
		></HorizontalLine>
		<List
			figmaImportConfig={systemsDock}
			figmaImport={{ desktop: { top: 111, left: '0', width: '100%', height: 791 } }}
		>
			{#each systemArray as system, ix}
				<ListItem
					transitions={getTransition((ix + 1) * 1.3)}
					marginTop="2%"
					marginBottom="4%"
					width="100%"
					height="6%"
					style="min-height: 6%"
					><Button
						onClick={() => {
							selectedSys = system.id;
						}}
						color={selectedSys === system.id ? $globalStyle.activeMono : $globalStyle.secondaryMono}
						borderColor={selectedSys === system.id
							? $globalStyle.activeColor
							: $globalStyle.secondaryColor}
						desktopFont={$globalStyle.smallDesktopFont}
						width="80%"
						hoverOpacityMax={20}
						hoverOpacityMin={0}
						height="100%"
						label={system.displayName}
					></Button></ListItem
				>
			{/each}
		</List>
		<HorizontalLine
			transitions={getTransition(5)}
			color={$globalStyle.activeColor}
			figmaImportConfig={systemsDock}
			figmaImport={{ desktop: { top: 924, left: '0', width: '100%', height: 1.2 } }}
		></HorizontalLine>
		<Button
			transitions={getTransition(7)}
			figmaImport={{ desktop: { top: 610, left: 22, width: 214, height: 50 } }}
			figmaImportConfig={systemsDock}
			hoverOpacityMax={20}
			hoverOpacityMin={0}
			desktopFont={$globalStyle.smallDesktopFont}
			label="Restart FLT CTRL Process"
			style="padding-bottom: 12%;"
			><FltProcessRestartDeco width="40%" height="40%" top="50%" /></Button
		>
		<Button
			transitions={getTransition(8)}
			figmaImport={{ desktop: { top: 715, left: 22, width: 214, height: 50 } }}
			figmaImportConfig={systemsDock}
			hoverOpacityMax={20}
			hoverOpacityMin={0}
			color={$globalStyle.errorColor}
			borderColor={$globalStyle.errorColor}
			backgroundColor={$globalStyle.errorColor}
			desktopFont={$globalStyle.smallDesktopFont}
			label="Restart FLT Computer"
			style="padding-bottom: 12%;"
			><FltComputerRestartDeco
				width="40%"
				height="40%"
				top="50%"
				color={$globalStyle.errorColor}
			/></Button
		>
		<Button
			transitions={getTransition(9)}
			figmaImport={{ desktop: { top: 820, left: 22, width: 214, height: 50 } }}
			figmaImportConfig={systemsDock}
			hoverOpacityMax={20}
			hoverOpacityMin={0}
			color={$globalStyle.errorColor}
			borderColor={$globalStyle.errorColor}
			backgroundColor={$globalStyle.errorColor}
			desktopFont={$globalStyle.smallDesktopFont}
			label="Shut Down FLT Computer"
			style="padding-bottom: 12%;"
			><FltComputerShutdownDeco
				width="40%"
				height="40%"
				top="50%"
				color={$globalStyle.errorColor}
			/></Button
		>
		<Button
			transitions={getTransition(10)}
			onClick={() => {
				localStorage.removeItem('auth');
				VID.set('');
				password.set('');
				loggedIn.set(false);
			}}
			figmaImport={{ desktop: { top: 942, left: 22, width: 214, height: 47 } }}
			figmaImportConfig={systemsDock}
			hoverOpacityMax={20}
			hoverOpacityMin={0}
			desktopFont={$globalStyle.smallDesktopFont}
			label="Disconnect"
		></Button>
	</Box>
	{#if showDecoGrid}
		<Box
			style="z-index: -1;"
			backgroundColor="{$globalStyle.activeColor}10"
			transitions={{ in: { func: fade, options: { y: '-1%', duration: 500 } } }}
			figmaImport={{ desktop: { top: 39, left: 337, width: 1545, height: 1002 } }}
		>
			<List direction="row" width="100%" height="100%" style="flex-wrap: wrap; overflow: hidden;">
				{#each new Array(280) as x, ix}
					<ListItem marginBottom="0%" width="5vh" height="5vh" style="min-width: 5%;">
						<DecoX
							style="transform: rotate(-45deg);"
							width="100%"
							height="100%"
							color={$globalStyle.activeColor}
							opacity={0.5}
						/>
					</ListItem>
				{/each}
			</List>
			{#if selectedSys === 'none'}
				<Label
					desktopFont={$globalStyle.smallDesktopFont}
					color={$globalStyle.secondaryMono}
					text="[No System Selected]"
				></Label>
			{/if}
			<svelte:component this={getComponentFromSystemID(selectedSys)} width="100%" height="100%"
			></svelte:component>
		</Box>
	{/if}
{/if}
