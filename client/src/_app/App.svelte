<script>
</script>

<main>
	<h1>Svelte world.</h1>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		@apply bg-black text-white;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
		font-family: monospace;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>