<script lang="ts">
	import getDailyVariant from '$lib/seeded.ts';

	const variants = [
		{ tone: "gentle", line: "A threshold reveals itself." },
		{ tone: "neutral", line: "You stand at the edge of what was and what could be." },
		{ tone: "sharp", line: "Every entrance is also an exit." }
	];

	$: variant = getDailyVariant('threshold-home', variants);
</script>

<div class="threshold">
	<main class="room">
		<h1>Threshold</h1>
		<p class="variant" class:gentle={variant.tone === 'gentle'} class:sharp={variant.tone === 'sharp'}>
			{variant.line}
		</p>

		<div class="exits">
			<h2>Beginnings</h2>
			<nav>
				<a href="/rooms/atrium" class="entrance">The Atrium</a>
				<a href="/rooms/mirror" class="entrance">The Mirror Hall</a>
				<a href="/rooms/threshold" class="entrance">The Threshold</a>
			</nav>
		</div>

		<footer>
			<p>A personal site that behaves like a <strong>threshold</strong> — non-linear navigation, subtle ephemerality, and room for future experiments.</p>
		</footer>
	</main>
</div>

<style>
	.threshold {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem;
	}

	.room {
		max-width: 600px;
		text-align: center;
		animation: fadeIn 0.8s ease-in;
	}

	h1 {
		font-size: 3rem;
		font-weight: 300;
		margin-bottom: 2rem;
		color: #562446;
	}

	.variant {
		font-size: 1.25rem;
		line-height: 1.6;
		margin-bottom: 3rem;
		opacity: 0.9;
		transition: opacity 0.3s ease;
	}

	.variant.gentle {
		font-style: italic;
		opacity: 0.8;
	}

	.variant.sharp {
		font-weight: 500;
		opacity: 1;
	}

	.exits {
		margin: 3rem 0;
	}

	.exits h2 {
		font-size: 1.5rem;
		font-weight: 400;
		margin-bottom: 1.5rem;
		color: #562446;
	}

	.entrance {
		display: block;
		padding: 1rem 2rem;
		margin: 0.75rem 0;
		background: rgba(195, 111, 9, 0.1);
		border: 1px solid #c36f09;
		color: #c36f09;
		border-radius: 4px;
		text-decoration: none;
		transition: all 0.2s ease;
		font-weight: 400;
	}

	.entrance:hover {
		background: #c36f09;
		color: white;
		transform: translateX(4px);
		text-decoration: none;
	}

	footer {
		margin-top: 4rem;
		padding-top: 2rem;
		border-top: 1px solid rgba(86, 36, 70, 0.2);
		font-size: 0.9rem;
		opacity: 0.7;
	}

	footer strong {
		color: #c36f09;
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
		.threshold {
			padding: 1rem;
		}

		h1 {
			font-size: 2rem;
		}

		.variant {
			font-size: 1.1rem;
		}
	}
</style>
