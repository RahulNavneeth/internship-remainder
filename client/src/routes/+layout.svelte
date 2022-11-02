<script lang="ts">
	import Navbar from '$lib/components/navbar.svelte';
	import Time from '$lib/components/time.svelte';
	import { page } from '$app/stores';
	import '../app.css';
</script>

<div class="w-screen h-screen  flex flex-col items-start justify-start primary">
	<Navbar />
	{#if !['/', '/client', '/auth/client/login', '/auth/client/signup', '/auth/admin/login'].includes($page.url.pathname)}
		<Time />
	{/if}
	<slot />
</div>

<style global>
	.primary {
		font-family: 'Merriweather', serif;
	}

	.secondary {
		font-family: 'Fira Code', monospace;
	}
</style>
