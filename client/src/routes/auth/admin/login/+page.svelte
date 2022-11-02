<script lang="ts">
	import { goto } from '$app/navigation';
	import { ADMIN_PASSWORD, ERROR, RESET_ERROR, SET_PASSWORD_TRUE } from '$lib/constants';

	let password: string = '';
</script>

<form
	on:submit|preventDefault={() => {
		if (!!password) {
			if (password === ADMIN_PASSWORD) {
				SET_PASSWORD_TRUE('ADMIN');
				goto('/admin');
			} else {
				ERROR.set(['Invalid password!']);
				RESET_ERROR();
			}
		} else {
			ERROR.set(['Password field must not left empty!']);
			RESET_ERROR();
		}
	}}
	class="w-full h-screen flex flex-col items-center justify-center"
>
	<div class="flex flex-col items-start justify-center">
		<div class="font-black">Password:</div>
		<input
			bind:value={password}
			type="password"
			placeholder="eg : admin123"
			class="w-[350px] h-[65px] my-2 bg-[#f5f5f5] border-black border-4 rounded-md outline-none px-4"
		/>
		{#if !!$ERROR[0]}
			<span class="text-red-800">{$ERROR[0]}</span>
		{/if}
	</div>
	<button
		class="w-[350px] h-[65px] mt-2 rounded-md bg-black hover:bg-stone-900 transition-all text-white"
	>
		Submit
	</button>
</form>
