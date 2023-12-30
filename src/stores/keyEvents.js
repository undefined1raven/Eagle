import { writable } from "svelte/store";


const onKeyDown = writable({ empty: true, event: undefined });
const onKeyPress = writable({ empty: true, event: undefined });
const onKeyUp = writable({ empty: true, event: undefined });


export { onKeyDown, onKeyPress, onKeyUp };