<script lang="ts">
	import GeneralObserver from './general-observer.svelte';
	import { getSoundCloudEmbedUrl } from '../utils/soundcloud.js';

	interface Props {
		url: string;
		color?: string;
		auto_play?: boolean;
		show_comments?: boolean;
		width?: string;
		height?: string;
		disable_observer?: boolean;
		iframe_styles?: string;
	}

	let {
		url,
		color = 'ff5500',
		auto_play = false,
		show_comments = true,
		width = '100%',
		height = '166',
		disable_observer = false,
		iframe_styles
	}: Props = $props();

	const embedUrl = $derived(
		getSoundCloudEmbedUrl(url, {
			color,
			autoPlay: auto_play,
			showComments: show_comments
		})
	);
</script>

<GeneralObserver {disable_observer}>
	{#if embedUrl}
		<iframe
			src={embedUrl}
			{width}
			{height}
			title="soundcloud-embed"
			allow="autoplay"
			loading="lazy"
			style={iframe_styles}
		></iframe>
	{/if}
</GeneralObserver>
