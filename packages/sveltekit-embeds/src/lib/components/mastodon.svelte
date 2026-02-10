<script lang="ts">
	import GeneralObserver from './general-observer.svelte';
	import { getMastodonEmbedInfo } from '../utils/mastodon.js';

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

	const embedInfo = $derived(getMastodonEmbedInfo(url));

	const ensureMastodonScript = async (scriptUrl: string) => {
		if (typeof window === 'undefined') {
			return;
		}

		const existingScript = document.querySelector<HTMLScriptElement>(`script[src="${scriptUrl}"]`);
		if (existingScript) {
			if (existingScript.dataset.loaded === 'true') {
				return;
			}

			await new Promise<void>((resolve, reject) => {
				existingScript.addEventListener('load', () => resolve(), { once: true });
				existingScript.addEventListener('error', () => reject(new Error('Failed to load Mastodon script')), {
					once: true
				});
			});
			return;
		}

		await new Promise<void>((resolve, reject) => {
			const script = document.createElement('script');
			script.src = scriptUrl;
			script.async = true;
			script.dataset.sveltekitEmbedsScript = 'mastodon';
			script.onload = () => {
				script.dataset.loaded = 'true';
				resolve();
			};
			script.onerror = () => reject(new Error('Failed to load Mastodon script'));
			document.head.appendChild(script);
		});
	};

	$effect(() => {
		if (!embedInfo) {
			return;
		}

		void ensureMastodonScript(embedInfo.scriptUrl);
	});
</script>

<GeneralObserver {disable_observer}>
	{#if embedInfo}
		<iframe
			src={embedInfo.embedUrl}
			{width}
			{height}
			title="mastodon-embed"
			allow="autoplay; encrypted-media; picture-in-picture"
			loading="lazy"
			style={iframe_styles}
		></iframe>
	{/if}
</GeneralObserver>
