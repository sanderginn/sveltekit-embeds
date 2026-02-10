<script lang="ts">
	import GeneralObserver from './general-observer.svelte';
	import { getAppleMusicEmbedUrl, parseAppleMusicUrl } from '../utils/apple-music.js';

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
		height = '450',
		disable_observer = false,
		iframe_styles
	}: Props = $props();

	const parsed = $derived(parseAppleMusicUrl(url));
	const embedUrl = $derived(getAppleMusicEmbedUrl(url, theme));
</script>

<GeneralObserver {disable_observer}>
	{#if embedUrl && parsed.isValid}
		<iframe
			src={embedUrl}
			{width}
			{height}
			title={`apple-music-${parsed.type}-${parsed.id}`}
			allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
			loading="lazy"
			style={iframe_styles}
		></iframe>
	{/if}
</GeneralObserver>
