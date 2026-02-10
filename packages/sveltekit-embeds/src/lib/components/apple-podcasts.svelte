<script lang="ts">
	import GeneralObserver from './general-observer.svelte';
	import { getApplePodcastsEmbedUrl, parseApplePodcastsUrl } from '../utils/apple-podcasts.js';

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
		height = '175',
		disable_observer = false,
		iframe_styles
	}: Props = $props();

	const parsed = $derived(parseApplePodcastsUrl(url));
	const embedUrl = $derived(getApplePodcastsEmbedUrl(url, theme));
</script>

<GeneralObserver {disable_observer}>
	{#if embedUrl && parsed.isValid}
		<iframe
			src={embedUrl}
			{width}
			{height}
			title={`apple-podcasts-${parsed.type}-${parsed.id}`}
			allow="autoplay *; encrypted-media *; fullscreen *"
			loading="lazy"
			style={iframe_styles}
		></iframe>
	{/if}
</GeneralObserver>
