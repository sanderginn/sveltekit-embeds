<script lang="ts">
	import GeneralObserver from './general-observer.svelte';
	import { getTidalEmbedUrl, parseTidalUrl } from '../utils/tidal.js';

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
		height = '400',
		disable_observer = false,
		iframe_styles
	}: Props = $props();

	const parsed = $derived(parseTidalUrl(url));
	const embedUrl = $derived(getTidalEmbedUrl(url));
</script>

<GeneralObserver {disable_observer}>
	{#if embedUrl}
		<iframe
			src={embedUrl}
			{width}
			{height}
			title={`tidal-${parsed.type}-${parsed.id}`}
			allow="autoplay; encrypted-media; clipboard-write"
			loading="lazy"
			style={iframe_styles}
		></iframe>
	{/if}
</GeneralObserver>
