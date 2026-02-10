<script lang="ts">
	import GeneralObserver from './general-observer.svelte';
	import { getPadding } from '../utils/index.js';
	import { getTikTokEmbedUrl } from '../utils/tiktok.js';

	interface Props {
		url: string;
		aspectRatio?: string;
		controls?: boolean;
		progress_bar?: boolean;
		play_button?: boolean;
		volume_control?: boolean;
		disable_observer?: boolean;
		iframe_styles?: string;
	}

	let {
		url,
		aspectRatio = '16:9',
		controls = true,
		progress_bar = true,
		play_button = true,
		volume_control = true,
		disable_observer = false,
		iframe_styles
	}: Props = $props();

	const baseEmbedUrl = $derived(getTikTokEmbedUrl(url));
	const paddingStyle = $derived(getPadding(aspectRatio));
	const embedUrl = $derived.by(() => {
		if (!baseEmbedUrl) {
			return null;
		}

		const params = new URLSearchParams({
			controls: controls ? '1' : '0',
			progress_bar: progress_bar ? '1' : '0',
			play_button: play_button ? '1' : '0',
			volume_control: volume_control ? '1' : '0'
		});

		return `${baseEmbedUrl}?${params.toString()}`;
	});
</script>

<GeneralObserver {disable_observer}>
	{#if embedUrl}
		<div class="wrapper" style={paddingStyle}>
			<iframe
				src={embedUrl}
				title="tiktok-embed"
				allow="autoplay; encrypted-media; picture-in-picture"
				allowfullscreen
				loading="lazy"
				style={iframe_styles}
			></iframe>
		</div>
	{/if}
</GeneralObserver>

<style>
	.wrapper {
		position: relative;
		width: 100%;
	}

	iframe {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		border: 0;
	}
</style>
