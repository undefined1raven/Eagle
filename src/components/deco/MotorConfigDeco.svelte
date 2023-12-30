<script>
	import globalStyle from '../../stores/globalStyles';
	let lglobalStyles = $globalStyle;
	let height = '5vh';
	let width = '5vh';
	let left = 'auto';
	let top = 'auto';
	let style = '';
	let topLeft = false;
	let topRight = false;
	let bottomRight = false;
	let bottomLeft = false;
	let primaryColor = $globalStyle.activeColor;
	let secondaryColor = $globalStyle.secondaryColor;

	export {
		height,
		width,
		left,
		top,
		style,
		primaryColor,
		secondaryColor,
		topLeft,
		topRight,
		bottomLeft,
		bottomRight
	};
</script>

<svg
	{width}
	{height}
	style="position: absolute; top: {top}; left: {left}; {style}"
	viewBox="0 0 39 40"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<rect
		width="15.7143"
		height="15.7143"
		rx="3"
		fill={topLeft ? primaryColor : secondaryColor}
		fill-opacity="0.8"
	/>
	<rect
		x="22.8569"
		width="15.7143"
		height="15.7143"
		rx="3"
		fill={topRight ? primaryColor : secondaryColor}
		fill-opacity="0.8"
	/>
	<rect
		x="22.8569"
		y="24.2857"
		width="15.7143"
		height="15.7143"
		rx="3"
		fill={bottomRight ? primaryColor : secondaryColor}
		fill-opacity="0.8"
	/>
	<rect
		y="22.8571"
		width="15.7143"
		height="15.7143"
		rx="3"
		fill={bottomLeft ? primaryColor : secondaryColor}
		fill-opacity="0.8"
	/>
</svg>

<style>
	rect {
		transition: all linear 0.1s;
	}
</style>
