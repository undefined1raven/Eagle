import { writable } from "svelte/store";


const lastPing = writable(0);

export { lastPing }