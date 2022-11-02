<script lang="ts">
	import { goto } from '$app/navigation';
	import { LOGGED_IN } from '$lib/constants';
	import { onMount } from 'svelte';

	onMount(() => {
		if (!$LOGGED_IN) {
			goto('/');
		}
	});
</script>

Client page
