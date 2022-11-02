import { writable } from 'svelte/store';
export let percent = writable<number>(Math.floor((new Date().getHours() * 100) / 24));
export let time = writable<string>(new Date().toLocaleTimeString());
setInterval(() => {
	percent.set(Math.floor((new Date().getHours() * 100) / 24));
	time.set(new Date().toLocaleTimeString());
});
