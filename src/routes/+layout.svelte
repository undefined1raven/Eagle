<script>
	import { onMount } from 'svelte';
	import { startConnection } from '../fn/realtime';
	import { RTC } from '../stores/RTC';
	import { loggedIn } from '../stores/loggedIn';

	const RTCC = startConnection();
	RTC.set(RTCC);
    
</script>

<slot />
 