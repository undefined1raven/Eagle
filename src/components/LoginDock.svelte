<script>
	import { onMount } from 'svelte';
	import Button from './common/Button.svelte';
	import Input from './common/Input.svelte';
	import Label from './common/Label.svelte';
	import PasswordInput from './common/PasswordInput.svelte';
	import { getTransition } from '../fn/getTransisitions';
	import { emit } from '../fn/realtime';
	import { RTC } from '../stores/RTC';
	import { VID, password } from '../stores/loginCreds';
	import { v4 } from 'uuid';
	import { validateInput } from '../fn/validateInput';
	import { loggedIn } from '../stores/loggedIn';
	import Box from './common/Box.svelte';
	import globalStyle from '../stores/globalStyles';
	function onLogin() {
		$RTC.subscribe('client.' + $VID + '.' + $password, (err, v) => {
			// console.log(v);
		});
		console.log(
			emit($RTC, 'server.' + $VID + '.' + $password, { type: 'loginReq', payload: `CT-${v4()}` })
		);
	}

	onMount(() => {
		try {
			let auth = localStorage.getItem('auth');
			let parsedAuth = JSON.parse(auth);
			if (validateInput(['V', 'P'], parsedAuth) === true) {
				VID.set(parsedAuth.V);
				password.set(parsedAuth.P);
				onLogin();
			}
		} catch (e) {}
	});
</script>

<Label
	desktopFont={$globalStyle.mediumDesktopFont}
	figmaImport={{ desktop: { top: 386, left: 764 } }}
	text="Vulture ID"
	transitions={getTransition(1)}
></Label>

<Box
	transitions={getTransition(2)}
	figmaImport={{ desktop: { top: 413, left: 764, width: 392, height: 52 } }}
>
	<Input
		on:onValue={(e) => {
			VID.set(e.detail);
		}}
		bind:value={$VID}
		width="98%"
		height="100%"
		desktopFont={$globalStyle.mediumDesktopFont}
		borderColor={$globalStyle.activeColor}
		paddingLeft="2%"
	/>
</Box>

<Label
	desktopFont={$globalStyle.mediumDesktopFont}
	figmaImport={{ desktop: { top: 502, left: 764 } }}
	text="Password"
	transitions={getTransition(3)}
></Label>

<Box
	transitions={getTransition(4)}
	figmaImport={{ desktop: { top: 532, left: 764, width: 392, height: 52 } }}
>
	<PasswordInput
		on:onValue={(e) => {
			password.set(e.detail);
		}}
		bind:value={$password}
		width="98%"
		height="100%"
		desktopFont={$globalStyle.mediumDesktopFont}
		borderColor={$globalStyle.activeColor}
		paddingLeft="2%"
	/>
</Box>

<Button
	onClick={onLogin}
	transitions={getTransition(5)}
	desktopFont={$globalStyle.mediumDesktopFont}
	hoverOpacityMax={20}
	hoverOpacityMin={0}
	figmaImport={{ desktop: { top: 641, left: 813, width: 293, height: 52 } }}
	label="Connect"
></Button>
