<script lang="ts">
	import { schedule_data } from '$lib/schedule';
	import { percent, time } from '$lib/store/time';
</script>

<div
	class="flex flex-col  p-4 shadow-lg z-10 bg-[whitesmoke] border-b-2 border-black  w-full items-center justify-center"
>
	<div class="flex flex-row primary item-center justify-between my-2 w-full px-10">
		<span class="font-black ">{$percent}%</span>
		<span class="font-black ">Active Remainders : {schedule_data.length}</span>
		<span class="font-black ">{$time}</span>
	</div>
	<div class="flex flex-row border-2 border-black items-center justify-center">
		{#each [...Array(100).keys()].map((i) => i + 1) as value}
			<div class="w-2 h-2 {value <= $percent ? 'bg-black' : ''}" />
		{/each}
	</div>
</div>
