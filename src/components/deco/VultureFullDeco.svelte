<script>
	import globalStyle from '../../stores/globalStyles';
	let lglobalStyles = $globalStyle;
	let height = '5vh';
	let width = '5vh';
	let left = 'auto';
	let top = 'auto';
	let style = '';
	let color = lglobalStyles.activeColor;

	export { height, width, left, top, style, color };
</script>

<svg
	{width}
	{height}
	style="position: absolute; top: {top}; left: {left}; {style}"
	viewBox="0 0 47 53"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<path
		d="M1 23.875C1 22.2181 2.34315 20.875 4 20.875H42.375C44.0319 20.875 45.375 22.2181 45.375 23.875V52H1V23.875Z"
		stroke={color}
		stroke-width="2"
	/>
	<rect x="17.0625" y="7.125" width="12.25" height="7.28125" rx="3.5" stroke={color} />
	<rect x="22.7144" y="3.02856" width="1.51429" height="3.78571" fill={color} />
	<rect x="4.96875" y="1.65625" width="36.4375" height="1.65625" fill={color} />
	<rect width="4.96875" height="4.96875" rx="1" fill={color} />
	<rect x="41.4062" width="4.96875" height="4.96875" rx="1" fill={color} />
	<rect x="21.5312" y="9.9375" width="3.3125" height="1.65625" rx="0.828125" fill={color} />
	<rect x="4.96875" y="48.0312" width="1.65625" height="1.65625" fill={color} />
	<rect x="8.28125" y="48.0312" width="1.65625" height="1.65625" fill={color} />
</svg>

<style>
	rect{
		transition: all linear 0.1s;
	}
</style>