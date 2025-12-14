<script lang="ts">
	import { page } from '$app/stores';
	import { getRoomBySlug, rooms, type Room } from '$lib/rooms.js';
	import getDailyVariant from '$lib/seeded.js';

	let { data } = $props();

	const slug = $derived($page.params.slug);
	const room = $derived(getRoomBySlug(slug));
	const variant = $derived(room ? getDailyVariant(slug, room.variants) : null);
	const connectedRooms = $derived(room ? rooms.filter(r => room.exits.includes(r.slug)) : []);
</script>

{#if room}
	<div class="room-container">
		<main class="room">
			<header>
				<h1>{room.title}</h1>
				<p class="variant" class:gentle={variant?.tone === 'gentle'} class:sharp={variant?.tone === 'sharp'}>
					{variant?.line}
				</p>
			</header>

			<div class="content">
				<p>{room.content}</p>
			</div>

			<nav class="exits">
				<h2>Exits</h2>
				<div class="exit-list">
					{#each connectedRooms as connectedRoom}
						<a href="/rooms/{connectedRoom.slug}" class="exit">
							<span class="exit-name">{connectedRoom.title}</span>
							<span class="exit-hint">{connectedRoom.content.slice(0, 50)}...</span>
						</a>
					{/each}
				</div>
			</nav>

			<nav class="navigation">
				<a href="/" class="back">← Return to Threshold</a>
			</nav>
		</main>
	</div>
{:else}
	<div class="room-container">
		<main class="room not-found">
			<h1>Room Not Found</h1>
			<p>This room doesn't exist, or it has moved elsewhere.</p>
			<a href="/" class="back">← Return to Threshold</a>
		</main>
	</div>
{/if}

<style>
	.room-container {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem;
	}

	.room {
		max-width: 700px;
		width: 100%;
		animation: fadeIn 1s ease-in;
	}

	.not-found {
		text-align: center;
	}

	header {
		margin-bottom: 3rem;
	}

	h1 {
		font-size: 2.5rem;
		font-weight: 300;
		margin-bottom: 1.5rem;
		color: #562446;
	}

	.variant {
		font-size: 1.25rem;
		line-height: 1.6;
		opacity: 0.9;
		transition: opacity 0.3s ease;
		margin: 0;
	}

	.variant.gentle {
		font-style: italic;
		opacity: 0.8;
	}

	.variant.sharp {
		font-weight: 500;
		opacity: 1;
	}

	.content {
		margin: 3rem 0;
		padding: 2rem;
		background: rgba(255, 255, 255, 0.3);
		border-radius: 8px;
		border-left: 4px solid #c36f09;
	}

	.content p {
		font-size: 1.1rem;
		line-height: 1.7;
		margin: 0;
		color: #562446;
	}

	.exits {
		margin: 3rem 0;
	}

	.exits h2 {
		font-size: 1.75rem;
		font-weight: 400;
		margin-bottom: 2rem;
		color: #562446;
		text-align: center;
	}

	.exit-list {
		display: grid;
		gap: 1rem;
	}

	.exit {
		display: block;
		padding: 1.5rem 2rem;
		background: rgba(41, 102, 0, 0.1);
		border: 1px solid #296600;
		border-radius: 6px;
		color: #296600;
		text-decoration: none;
		transition: all 0.3s ease;
	}

	.exit:hover {
		background: #296600;
		color: white;
		transform: translateY(-2px);
		text-decoration: none;
	}

	.exit-name {
		display: block;
		font-weight: 500;
		font-size: 1.1rem;
		margin-bottom: 0.5rem;
	}

	.exit-hint {
		display: block;
		font-size: 0.9rem;
		opacity: 0.8;
		font-style: italic;
	}

	.navigation {
		margin-top: 3rem;
		text-align: center;
	}

	.back {
		display: inline-block;
		padding: 0.75rem 1.5rem;
		background: transparent;
		border: 1px solid #c36f09;
		color: #c36f09;
		border-radius: 4px;
		text-decoration: none;
		transition: all 0.2s ease;
		font-weight: 400;
	}

	.back:hover {
		background: #c36f09;
		color: white;
		text-decoration: none;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (max-width: 768px) {
		.room-container {
			padding: 1rem;
		}

		h1 {
			font-size: 2rem;
		}

		.content {
			padding: 1.5rem;
		}

		.exit {
			padding: 1rem 1.5rem;
		}
	}
</style>