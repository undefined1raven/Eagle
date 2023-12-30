import { writable } from "svelte/store";


const loggedIn = writable(false);

export { loggedIn }