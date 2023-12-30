<script>
	import globalStyle from '../../stores/globalStyles';
	import Box from '../common/Box.svelte';
	import Label from '../common/Label.svelte';
	import ProgressBar from '../common/ProgressBar.svelte';
	import { LineChart, BarChartStacked, PieChart, StackedAreaChart } from '@carbon/charts-svelte';
	import '@carbon/styles/css/styles.css';
	import '@carbon/charts-svelte/styles.css';
	import { fly } from 'svelte/transition';
	import getOptions from '../../fn/getChartOptions';
	import getRandomInt from '../../fn/getRandomInt';
	import { onMount } from 'svelte';
	const containerConfig = { containerWidth: 1545, containerHeight: 1002 };
	const motorViewContainerConfig = { containerWidth: 584, containerHeight: 279 };

	const options = getOptions({ 1: `#${$globalStyle.activeMono}` });

	$: data = [];


	onMount(() => {
		setInterval(() => {
			if (data.length > 20) {
				data.shift();
			}
            if(Math.random() < .9){
                data = [...data, { group: 1, value: getRandomInt(0, 90), date: Date.now() }];
            }else{
                data = [...data, { group: 1, value: getRandomInt(0, 90), date: Date.now() }]
            }
		}, 200);
	});
</script>

<Box
	style="border-bottom: solid 1px {$globalStyle.activeColor};"
	transitions={{ in: { func: fly, options: { duration: 200, y: '-20%' } } }}
	figmaImport={{ desktop: { top: 28, left: '50%', width: 350, height: 147 } }}
	horizontalCenter={true}
>
	<LineChart style="background-color: #010007; padding-bottom: 2%;" {data} {options} />
</Box>

<style>
	:global(.chart-grid-backdrop) {
		fill: #00000000 !important;
	}
	:global(.header) {
		display: none;
	}
	:global(.checkbox) {
		border: solid 1px #00000000;
	}
</style>
