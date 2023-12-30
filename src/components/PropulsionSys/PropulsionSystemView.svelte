<script>
	import globalStyle from '../../stores/globalStyles';
	import Box from '../common/Box.svelte';
	import Label from '../common/Label.svelte';
	import ProgressBar from '../common/ProgressBar.svelte';
	import MotorConfigDeco from '../deco/MotorConfigDeco.svelte';
	import PropulsionMotorView from './PropulsionMotorView.svelte';

	const containerConfig = { containerWidth: 1545, containerHeight: 1002 };
	const motorViewContainerConfig = { containerWidth: 584, containerHeight: 279 };
</script>

<Box
	figmaImportConfig={containerConfig}
	figmaImport={{ desktop: { top: 204, left: 176, width: 584, height: 279 } }}
	borderColor={$globalStyle.activeColor}
>
	<PropulsionMotorView
		motorConfigID="topLeft"
		motorWiringLabel="[D8 Black]"
		motorLabel="M1"
		containerConfig={motorViewContainerConfig}
	></PropulsionMotorView>
</Box>

<Box
	figmaImportConfig={containerConfig}
	figmaImport={{ desktop: { top: 204, left: 790, width: 584, height: 279 } }}
	borderColor={$globalStyle.activeColor}
>
	<PropulsionMotorView
		motorConfigID="topRight"
		motorWiringLabel="[D11 Red]"
		motorLabel="M2"
		containerConfig={motorViewContainerConfig}
	></PropulsionMotorView>
</Box>

<Box
	figmaImportConfig={containerConfig}
	figmaImport={{ desktop: { top: 513, left: 790, width: 584, height: 279 } }}
	borderColor={$globalStyle.activeColor}
>
	<PropulsionMotorView
		motorConfigID="bottomRight"
		motorWiringLabel="[D7 Blue]"
		motorLabel="M3"
		containerConfig={motorViewContainerConfig}
	></PropulsionMotorView>
</Box>

<Box
	figmaImportConfig={containerConfig}
	figmaImport={{ desktop: { top: 513, left: 176, width: 584, height: 279 } }}
	borderColor={$globalStyle.activeColor}
>
	<PropulsionMotorView
		motorConfigID="bottomLeft"
		motorWiringLabel="[D12 Purple]"
		motorLabel="M4"
		containerConfig={motorViewContainerConfig}
	></PropulsionMotorView>
</Box>
