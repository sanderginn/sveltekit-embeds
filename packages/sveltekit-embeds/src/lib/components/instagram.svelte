<script lang="ts">
	import GeneralObserver from './general-observer.svelte';
	import { extractInstagramId, getInstagramEmbedUrl } from '../utils/instagram.js';

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
		height = '560',
		disable_observer = false,
		iframe_styles
	}: Props = $props();

	const postId = $derived(extractInstagramId(url));
	const embedUrl = $derived(getInstagramEmbedUrl(url));
</script>

<GeneralObserver {disable_observer}>
	{#if embedUrl}
		<iframe
			src={embedUrl}
			{width}
			{height}
			title={`instagram-${postId}`}
			allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
			loading="lazy"
			style={iframe_styles}
		></iframe>
	{/if}
</GeneralObserver>
