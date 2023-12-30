import { writable } from "svelte/store";

const VID = writable('');
const password = writable('');

export { VID, password }