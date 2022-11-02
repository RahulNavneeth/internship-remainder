<script lang="ts">
	import { goto } from '$app/navigation';
	import { LOGGED_IN } from '$lib/constants';
	import { schedule_data } from '$lib/schedule';
	import { scheduler } from '$lib/store/scheduler';
	import { time } from '$lib/store/time';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';

	onMount(() => {
		if (!$LOGGED_IN) {
			goto('/');
		}
	});

	setTimeout(() => {
		const scroll = document.getElementById(`${parseInt($time.split(':')[0])}-time`);
		scroll?.scrollIntoView({ behavior: 'smooth' });
	}, 100);
	const sample_reply: { name: string; reply: string; time: number; id: number }[] = [
		{ name: 'Rahul Navneeth', reply: 'Yes sir!!', time: 18, id: 1 },
		{ name: 'Leela Krishana', reply: 'Sure sir!!', time: 18, id: 1 },
		{ name: 'Raul', reply: 'Yes sir!!', time: 18, id: 2 },
	];
</script>

<div class="w-full  overflow-scroll flex flex-col items-start justify-start bg-[#e9eaec]">
	<div class="w-full flex flex-col items-center flex-wrap justify-start p-4">
		{#each $scheduler as value, index}
			<div id="{value.id}-time" class="flex flex-col p-2 items-center justify-center w-full">
				<div
					class=" bg-white w-full {value.id === parseInt($time.split(':')[0])
						? ' border-2 border-black'
						: ''} rounded-lg"
				>
					<div class="w-full flex flex-row items-center justify-between  p-4">
						<div class="w-1/3">
							<span
								class="w-12 h-12 hover:bg-gray-200 outline-none font-black flex flex-col items-center justify-center   rounded-full  "
							>
								{value.id}
							</span>
						</div>

						<div class="w-1/3 flex flex-col items-center justify-center">
							<button
								on:click={() => {
									value.input_toggle
										? (value.input_toggle = false)
										: (value.input_toggle = true);
								}}
								class="rounded-full w-12 h-12 bg-black text-white"
							>
								+
							</button>
							{#if value.input_toggle}
								<div
									transition:slide
									class="flex flex-row items-center mt-3 justify-center"
								>
									<input
										bind:value={$scheduler[index].input}
										class="border-black outline-none mr-2 p-2 w-full border-2 rounded-md"
										placeholder="Add TASK"
										type="text"
									/>
									<button
										on:click={() => {
											schedule_data.push({
												at: value.id,
												subtitle: $scheduler[index].input,
												title: '',
											});
										}}
										class="rounded-md bg-black text-white p-2"
									>
										submit
									</button>
								</div>
							{/if}
						</div>
						<div class="w-1/3 text-center flex flex-col items-end justify-center">
							{#if value.id < parseInt($time.split(':')[0])}
								<s class="font-black text-[15px] text-center">
									{Math.abs(value.id - parseInt($time.split(':')[0])) - 1}:{$time
										.split(':')
										.slice(1, 3)
										.join(':')} hrs
								</s>
							{:else if Math.abs(value.id - parseInt($time.split(':')[0])) != 0}
								<div class="font-black text-[15px] ">
									In {Math.abs(
										value.id - parseInt($time.split(':')[0]) - 1,
									)}:{60 - parseInt($time.split(':')[1])}:{60 -
										parseInt($time.split(':')[2])} hrs
								</div>
							{/if}
						</div>
					</div>
					<!-- {#if value != timeCycle.length}
				<span class="secondary font-bold ">=></span>
			{/if} -->
					{#if value.schedules != null}
						<div class="w-full p-2">
							{#each value.schedules as schedule, i}
								<div
									class="w-full font-primary rounded-md secondary  flex flex-col mt-2 items-center justify-around"
								>
									<div
										class=" text-black font-primary flex flex-col bg-slate-200 font-bold text-[15px] w-full p-2 py-4 text-center rounded-md"
									>
										<span class="w-full">
											<span class="underline w-1/3">ADMIN</span>
											:
											<span
												class="font-mono underline w-2/3 bg-slate-100 p-2 rounded-md font-medium"
											>
												{schedule.subtitle.toUpperCase()}
											</span>
										</span>
										{#each sample_reply.filter((v) => v.time === value.id && v.id == i + 1) as reply, j}
											<span class="mt-4 w-full">
												<span class="w-1/3">
													&lt;{reply.name.toUpperCase()}&gt; :
												</span>
												<span
													class="font-mono w-2/3 bg-slate-100 p-2 rounded-md font-medium"
												>
													{reply.reply}
												</span>
											</span>
										{/each}
									</div>
								</div>
							{/each}
						</div>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</div>
