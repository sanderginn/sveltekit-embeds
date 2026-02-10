<script lang="ts">
	import GeneralObserver from './general-observer.svelte';
	import { getPadding } from '../utils/index.js';
	import { getTwitchEmbedUrl, parseTwitchUrl } from '../utils/twitch.js';

	interface Props {
		url: string;
		aspectRatio?: string;
		parent?: string;
		autoplay?: boolean;
		muted?: boolean;
		disable_observer?: boolean;
		iframe_styles?: string;
	}

	let {
		url,
		aspectRatio = '16:9',
		parent = '',
		autoplay = false,
		muted = false,
		disable_observer = false,
		iframe_styles
	}: Props = $props();

	const info = $derived(parseTwitchUrl(url));
	const hostParent = $derived(
		parent || (typeof window !== 'undefined' ? window.location.hostname : 'localhost')
	);
	const baseEmbedUrl = $derived(getTwitchEmbedUrl(url, hostParent));
	const paddingStyle = $derived(getPadding(aspectRatio));
	const embedUrl = $derived.by(() => {
		if (!baseEmbedUrl) {
			return null;
		}

		const query = new URL(baseEmbedUrl);
		query.searchParams.set('autoplay', autoplay ? 'true' : 'false');
		query.searchParams.set('muted', muted ? 'true' : 'false');
		return query.toString();
	});
</script>

<GeneralObserver {disable_observer}>
	{#if embedUrl && info.isValid}
		<div class="wrapper" style={paddingStyle}>
			<iframe
				src={embedUrl}
				title={info.channel ? `twitch-channel-${info.channel}` : info.videoId ? `twitch-video-${info.videoId}` : 'twitch-clip'}
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
