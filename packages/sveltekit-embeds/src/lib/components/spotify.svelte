<script lang="ts">
	import GeneralObserver from './general-observer.svelte';
	import { getSpotifyEmbedUrl, parseSpotifyUrl } from '../utils/spotify.js';

	interface Props {
		url: string;
		theme?: 'light' | 'dark';
		width?: string;
		height?: string;
		disable_observer?: boolean;
		iframe_styles?: string;
	}

	let {
		url,
		theme = 'light',
		width = '100%',
		height,
		disable_observer = false,
		iframe_styles
	}: Props = $props();

	const parsed = $derived(parseSpotifyUrl(url));
	const embedUrl = $derived(getSpotifyEmbedUrl(url, theme));
	const resolvedHeight = $derived(height ?? (parsed.type === 'track' ? '152' : '352'));
</script>

<GeneralObserver {disable_observer}>
	{#if embedUrl}
		<iframe
			src={embedUrl}
			{width}
			height={resolvedHeight}
			title={`spotify-${parsed.type}-${parsed.id}`}
			allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
			loading="lazy"
			style={iframe_styles}
		></iframe>
	{/if}
</GeneralObserver>
