<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { navigating } from '$app/stores';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
</svelte:head>

<style>
	:global(html, body) {
		margin: 0;
		padding: 0;
		font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		background-color: #ecedd4;
		color: #562446;
		min-height: 100vh;
	}

	:global(*) {
		box-sizing: border-box;
	}

	:global(a) {
		color: #c36f09;
		text-decoration: none;
		transition: color 0.2s ease;
	}

	:global(a:hover) {
		color: #a25908;
		text-decoration: underline;
	}

	.loading-indicator {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 3px;
		background: linear-gradient(90deg, #c36f09, #de5489);
		transform-origin: left;
		z-index: 1000;
	}

	.loading-indicator.loading {
		animation: loading 2s ease-in-out infinite;
	}

	@keyframes loading {
		0% { transform: scaleX(0); }
		50% { transform: scaleX(0.8); }
		100% { transform: scaleX(0); }
	}
</style>

{#if $navigating}
	<div class="loading-indicator loading"></div>
{/if}

{@render children()}