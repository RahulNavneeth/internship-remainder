<script lang="ts">
	import { goto } from '$app/navigation';
	import axios from 'axios';
	import { ERROR, RESET_ERROR, SET_PASSWORD_TRUE, USER_DATA_URL } from '$lib/constants';

	let username: string = '';
	let password: string = '';

	let user: { username: string; password: string }[] = [];
</script>

<form
	on:submit|preventDefault={async () => {
		if (!!password && !!username) {
			if (user.length === 0) {
				const { data } = await axios.get(`${USER_DATA_URL}&type=KEY_VALUE`, {
					params: {
						data: {
							range: ['Sheet1'],
						},
					},
				});
				user = data;
			}
			const get_user = user
				.map((i) => {
					return { username: i.username.toLowerCase(), password: i.password };
				})
				.filter((i) => i.username === username);

			if (get_user.length != 0) {
				if (password === `${get_user[0].password}`) {
					SET_PASSWORD_TRUE('CLIENT');
					goto('/client');
				} else {
					ERROR.set(['', 'Invalid password!']);
					RESET_ERROR();
				}
			} else {
				ERROR.set(["Username doesn't exist"]);
				RESET_ERROR();
			}
		} else {
			if (!!!password && !!username) {
				ERROR.set(['', 'Password field must not left empty!']);
				RESET_ERROR();
			} else if (!!password && !!!username) {
				ERROR.set(['username field must not left empty!', '']);
				RESET_ERROR();
			} else if (!!!password && !!!username) {
				ERROR.set([
					'username field must not left empty!',
					'password field must not left empty!',
				]);
				RESET_ERROR();
			}
		}
	}}
	class="w-full h-screen flex flex-col items-center justify-center"
>
	<div class="flex flex-col items-start justify-center">
		<div class="font-black">Username:</div>
		<input
			bind:value={username}
			type="text"
			placeholder="eg : client"
			class="w-[350px] h-[65px] my-2 bg-[#f5f5f5] border-black border-4 rounded-md outline-none px-4"
		/>
		{#if !!$ERROR[0]}
			<span class="text-red-800">{$ERROR[0]}</span>
		{/if}
	</div>
	<div class="flex flex-col mt-4 items-start justify-center">
		<div class="font-black">Password:</div>
		<input
			bind:value={password}
			type="password"
			placeholder="eg : client123"
			class="w-[350px] h-[65px] my-2 bg-[#f5f5f5] border-black border-4 rounded-md outline-none px-4"
		/>
		{#if !!$ERROR[1]}
			<span class="text-red-800">{$ERROR[1]}</span>
		{/if}
	</div>
	<button
		class="w-[350px] h-[65px] mt-2 rounded-md bg-black hover:bg-stone-900 transition-all text-white"
	>
		Submit
	</button>
</form>
