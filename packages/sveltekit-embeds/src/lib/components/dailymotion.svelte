<script lang="ts">
	import GeneralObserver from './general-observer.svelte';
	import { getPadding } from '../utils/index.js';
	import { extractDailymotionId, getDailymotionEmbedUrl } from '../utils/dailymotion.js';

	interface Props {
		url: string;
		aspectRatio?: string;
		autoplay?: boolean;
		mute?: boolean;
		controls?: boolean;
		disable_observer?: boolean;
		iframe_styles?: string;
	}

	let {
		url,
		aspectRatio = '16:9',
		autoplay = false,
		mute = false,
		controls = true,
		disable_observer = false,
		iframe_styles
	}: Props = $props();

	const videoId = $derived(extractDailymotionId(url));
	const baseEmbedUrl = $derived(getDailymotionEmbedUrl(url));
	const paddingStyle = $derived(getPadding(aspectRatio));
	const embedUrl = $derived.by(() => {
		if (!baseEmbedUrl) {
			return null;
		}

		const query = new URL(baseEmbedUrl);
		query.searchParams.set('autoplay', autoplay ? '1' : '0');
		query.searchParams.set('mute', mute ? '1' : '0');
		query.searchParams.set('controls', controls ? '1' : '0');
		return query.toString();
	});
</script>

<GeneralObserver {disable_observer}>
	{#if embedUrl}
		<div class="wrapper" style={paddingStyle}>
			<iframe
				src={embedUrl}
				title={`dailymotion-${videoId}`}
				allow="autoplay; fullscreen; picture-in-picture"
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
