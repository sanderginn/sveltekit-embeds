<script lang="ts">
	import GeneralObserver from './general-observer.svelte';
	import { extractLinkedInPostId, getLinkedInEmbedUrl } from '../utils/linkedin.js';

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
		height = '399',
		disable_observer = false,
		iframe_styles
	}: Props = $props();

	const postId = $derived(extractLinkedInPostId(url));
	const embedUrl = $derived(getLinkedInEmbedUrl(url));
</script>

<GeneralObserver {disable_observer}>
	{#if embedUrl}
		<iframe
			src={embedUrl}
			{width}
			{height}
			title={`linkedin-${postId}`}
			allowfullscreen
			loading="lazy"
			style={iframe_styles}
		></iframe>
	{/if}
</GeneralObserver>
