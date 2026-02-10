<script lang="ts">
	import GeneralObserver from './general-observer.svelte';
	import { extractRedditPostId, getRedditEmbedUrl } from '../utils/reddit.js';

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
		height = '500',
		disable_observer = false,
		iframe_styles
	}: Props = $props();

	const postId = $derived(extractRedditPostId(url));
	const embedUrl = $derived(getRedditEmbedUrl(url, theme));
</script>

<GeneralObserver {disable_observer}>
	{#if embedUrl}
		<iframe
			src={embedUrl}
			{width}
			{height}
			title={`reddit-${postId}`}
			loading="lazy"
			style={iframe_styles}
		></iframe>
	{/if}
</GeneralObserver>
