<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		threshold?: number;
		disable_observer?: boolean;
		children: Snippet;
	}

	let { threshold = 0.5, disable_observer = false, children }: Props = $props();
	let loaded = $state(false);
	let root = $state<HTMLElement | null>(null);

	$effect(() => {
		if (disable_observer || !root || loaded) {
			return;
		}

		if (typeof IntersectionObserver === 'undefined') {
			loaded = true;
			return;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry?.isIntersecting) {
					return;
				}

				loaded = true;
				observer.disconnect();
			},
			{ threshold }
		);

		observer.observe(root);

		return () => observer.disconnect();
	});
</script>

<div bind:this={root} data-testid="general-observer">
	{#if disable_observer || loaded}
		{@render children()}
	{/if}
</div>
