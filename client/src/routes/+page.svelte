<script lang="ts">
	import { goto } from '$app/navigation';
	import { LOGGED_IN, USER_TYPE } from '$lib/constants';
	import { onMount } from 'svelte';

	const BASE_URL = '/auth';

	onMount(() => {
		if ($LOGGED_IN) {
			if ($USER_TYPE === 'ADMIN') {
				goto('admin');
			} else {
				goto('client');
			}
		}
	});
</script>

<div class="w-full h-screen flex flex-col items-center justify-center">
	<div class=" flex flex-col items-start justify-center">
		<div class="font-black underline">Admin:</div>
		<button
			on:click={() => {
				goto(`${BASE_URL}/admin/login`);
			}}
			class="w-[350px] h-[65px] mt-2 rounded-md bg-black hover:bg-stone-900 transition-all text-white"
		>
			Login
		</button>
	</div>
	<div class="flex flex-col items-start mt-10 justify-center">
		<div class="font-black underline">Client:</div>
		<button
			on:click={() => {
				goto(`${BASE_URL}/client/login`);
			}}
			class="w-[350px] h-[65px] mt-2 rounded-md bg-black hover:bg-stone-900 transition-all text-white"
		>
			Login
		</button>
		<button
			on:click={() => {
				goto(`${BASE_URL}/client/signup`);
			}}
			class="w-[350px] h-[65px] mt-2 rounded-md bg-black hover:bg-stone-900 transition-all text-white"
		>
			Signup
		</button>
	</div>
</div>
