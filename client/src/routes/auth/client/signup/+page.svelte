<script lang="ts">
	import { goto } from '$app/navigation';
	import { ERROR, RESET_ERROR, USER_DATA_URL } from '$lib/constants';
	import axios from 'axios';
	let password: string = '';
	let confirm_password: string = '';
	let username: string = '';
	let user: { username: string; password: string }[] = [];
</script>

<form
	on:submit|preventDefault={async () => {
		if (!!password && !!username && !!confirm_password) {
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
			console.log(user);
			const get_user = user
				.map((i) => i.username.toLowerCase())
				.filter((i) => i === username.toLowerCase());
			console.log(get_user);
			if (get_user.length === 0) {
				if (password === confirm_password) {
					await axios.post(USER_DATA_URL, {
						data: [{ username: username, password: password }],
						props: {
							bgrgb: [255, 255, 255],
							font: 'Roboto Mono',
						},
					});
					goto('/auth/client/login');
				} else {
					ERROR.set([
						'',
						"password doesn't match confirm password",
						"confirm password doesn't match password!",
					]);
					RESET_ERROR();
				}
			} else {
				ERROR.set(['Username already exists!']);
				RESET_ERROR();
			}
		} else {
			if (!!!password && !!username && !!confirm_password) {
				ERROR.set(['', 'Password field must not left empty!', '']);
				RESET_ERROR();
			} else if (!!password && !!!username && !!confirm_password) {
				ERROR.set(['username field must not left empty!', '', '']);
				RESET_ERROR();
			} else if (!!password && !!username && !!!confirm_password) {
				ERROR.set(['', '', 'confirm password field must not left empty!']);
				RESET_ERROR();
			} else if (!!!password && !!!username && !!confirm_password) {
				ERROR.set([
					'username field must not left empty!',
					'Password field must not left empty!',
					'',
				]);
				RESET_ERROR();
			} else if (!!password && !!!username && !!!confirm_password) {
				ERROR.set([
					'username field must not left empty!',
					'',
					'confirm password field must not left empty!',
				]);
				RESET_ERROR();
			} else if (!!!password && !!username && !!!confirm_password) {
				ERROR.set([
					'',
					'Password field must not left empty!',
					'confirm password field must not left empty!',
				]);
				RESET_ERROR();
			} else if (!!!password && !!!username && !!!confirm_password) {
				ERROR.set([
					'username field must not left empty!',
					'password field must not left empty!',
					'confirm password field must not left empty!',
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
	<div class="flex flex-col mt-4 items-start justify-center">
		<div class="font-black">Confirm password:</div>
		<input
			bind:value={confirm_password}
			type="password"
			placeholder="eg : client123"
			class="w-[350px] h-[65px] my-2 bg-[#f5f5f5] border-black border-4 rounded-md outline-none px-4"
		/>
		{#if !!$ERROR[2]}
			<span class="text-red-800">{$ERROR[2]}</span>
		{/if}
	</div>
	<button
		class="w-[350px] h-[65px] mt-2 rounded-md bg-black hover:bg-stone-900 transition-all text-white"
	>
		Submit
	</button>
</form>
