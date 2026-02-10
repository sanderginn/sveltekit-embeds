<script lang="ts">
	import GeneralObserver from './general-observer.svelte';
	import { getDeezerEmbedUrl, parseDeezerUrl } from '../utils/deezer.js';

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

	const parsed = $derived(parseDeezerUrl(url));
	const embedUrl = $derived(getDeezerEmbedUrl(url, theme));
	const resolvedHeight = $derived(height ?? (parsed.type === 'track' ? '150' : '380'));
</script>

<GeneralObserver {disable_observer}>
	{#if embedUrl}
		<iframe
			src={embedUrl}
			{width}
			height={resolvedHeight}
			title={`deezer-${parsed.type}-${parsed.id}`}
			allow="encrypted-media; clipboard-write"
			loading="lazy"
			style={iframe_styles}
		></iframe>
	{/if}
</GeneralObserver>
