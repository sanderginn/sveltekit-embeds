<script lang="ts">
	import GeneralObserver from './general-observer.svelte';
	import { normalizeTwitterUrl } from '../utils/twitter.js';

	interface Props {
		url: string;
		theme?: 'light' | 'dark';
		disable_observer?: boolean;
	}

	type TwitterWindow = Window & {
		twttr?: {
			widgets?: {
				load: (element?: HTMLElement) => void;
			};
		};
	};

	let { url, theme = 'light', disable_observer = false }: Props = $props();
	const normalizedUrl = $derived(normalizeTwitterUrl(url));
	let container = $state<HTMLElement | null>(null);

	const ensureTwitterScript = async () => {
		if (typeof window === 'undefined') {
			return;
		}

		const twitterWindow = window as TwitterWindow;
		if (twitterWindow.twttr?.widgets) {
			return;
		}

		const existingScript = document.querySelector<HTMLScriptElement>(
			'script[data-sveltekit-embeds-script="twitter"]'
		);
		if (existingScript) {
			await new Promise<void>((resolve, reject) => {
				existingScript.addEventListener('load', () => resolve(), { once: true });
				existingScript.addEventListener('error', () => reject(new Error('Failed to load Twitter script')), {
					once: true
				});
			});
			return;
		}

		await new Promise<void>((resolve, reject) => {
			const script = document.createElement('script');
			script.src = 'https://platform.twitter.com/widgets.js';
			script.async = true;
			script.dataset.sveltekitEmbedsScript = 'twitter';
			script.onload = () => resolve();
			script.onerror = () => reject(new Error('Failed to load Twitter script'));
			document.head.appendChild(script);
		});
	};

	$effect(() => {
		if (!container || !normalizedUrl || typeof window === 'undefined') {
			return;
		}

		let destroyed = false;

		const render = async () => {
			try {
				await ensureTwitterScript();
				if (destroyed || !container) {
					return;
				}

				container.innerHTML = `<blockquote class="twitter-tweet" data-theme="${theme}"><a href="${normalizedUrl}"></a></blockquote>`;
				const twitterWindow = window as TwitterWindow;
				twitterWindow.twttr?.widgets?.load(container);
			} catch {
				if (container) {
					container.innerHTML = `<a href="${normalizedUrl}" rel="noopener noreferrer" target="_blank">${normalizedUrl}</a>`;
				}
			}
		};

		void render();

		return () => {
			destroyed = true;
			if (container) {
				container.innerHTML = '';
			}
		};
	});
</script>

<GeneralObserver {disable_observer}>
	<div bind:this={container}></div>
</GeneralObserver>
