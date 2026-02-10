<script lang="ts">
	import GeneralObserver from './general-observer.svelte';
	import { getBlueskyEmbedUrl, parseBlueskyUrl } from '../utils/bluesky.js';

	interface Props {
		url: string;
		width?: string;
		height?: string;
		disable_observer?: boolean;
		iframe_styles?: string;
	}

	let {
		url,
		width = '100%',
		height = '500',
		disable_observer = false,
		iframe_styles
	}: Props = $props();

	const parsed = $derived(parseBlueskyUrl(url));
	const embedUrl = $derived(getBlueskyEmbedUrl(url));
	let iframeElement = $state<HTMLIFrameElement | null>(null);
	let wrapperHeight = $state('500px');

	$effect(() => {
		wrapperHeight = height;
	});

	$effect(() => {
		if (!embedUrl) {
			return;
		}

		const onMessage = (event: MessageEvent) => {
			if (event.origin !== 'https://embed.bsky.app') {
				return;
			}

			if (event.source !== iframeElement?.contentWindow) {
				return;
			}

			if (typeof event.data !== 'object' || event.data === null) {
				return;
			}

			const payload = event.data as { height?: unknown };
			if (typeof payload.height !== 'number' || Number.isNaN(payload.height)) {
				return;
			}

			wrapperHeight = `${Math.max(payload.height, 100)}px`;
		};

		window.addEventListener('message', onMessage);
		return () => window.removeEventListener('message', onMessage);
	});
</script>

<GeneralObserver {disable_observer}>
	{#if embedUrl && parsed.isValid}
		<div style={`height: ${wrapperHeight}; width: ${width};`}>
			<iframe
				bind:this={iframeElement}
				src={embedUrl}
				width={width}
				height={wrapperHeight}
				title={`bluesky-${parsed.handle}-${parsed.postId}`}
				loading="lazy"
				style={iframe_styles}
			></iframe>
		</div>
	{/if}
</GeneralObserver>
