<script lang="ts">
	import GeneralObserver from './general-observer.svelte';
	import { getPadding } from '../utils/index.js';
	import { extractYouTubeVideoId, getYouTubeEmbedUrl } from '../utils/youtube.js';

	interface Props {
		url: string;
		aspectRatio?: string;
		autoPlay?: boolean;
		mute?: boolean;
		controls?: boolean;
		loop?: boolean;
		start?: number;
		disable_observer?: boolean;
		iframe_styles?: string;
	}

	let {
		url,
		aspectRatio = '16:9',
		autoPlay = false,
		mute = false,
		controls = true,
		loop = false,
		start = 0,
		disable_observer = false,
		iframe_styles
	}: Props = $props();

	const videoId = $derived(extractYouTubeVideoId(url));
	const baseEmbedUrl = $derived(getYouTubeEmbedUrl(url));
	const paddingStyle = $derived(getPadding(aspectRatio));
	const embedUrl = $derived.by(() => {
		if (!baseEmbedUrl) {
			return null;
		}

		const params = new URLSearchParams({
			autoplay: autoPlay ? '1' : '0',
			mute: mute ? '1' : '0',
			controls: controls ? '1' : '0'
		});

		if (loop && videoId) {
			params.set('loop', '1');
			params.set('playlist', videoId);
		}

		if (start > 0) {
			params.set('start', String(start));
		}

		return `${baseEmbedUrl}?${params.toString()}`;
	});
</script>

<GeneralObserver {disable_observer}>
	{#if embedUrl}
		<div class="wrapper" style={paddingStyle}>
			<iframe
				src={embedUrl}
				title={`youtube-${videoId}`}
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
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
