<script lang="ts">
	import GeneralObserver from './general-observer.svelte';
	import { getPinterestPostUrl } from '../utils/pinterest.js';

	interface Props {
		url: string;
		disable_observer?: boolean;
	}

	type PinterestWindow = Window & {
		PinUtils?: {
			build: () => void;
		};
	};

	let { url, disable_observer = false }: Props = $props();
	const postUrl = $derived(getPinterestPostUrl(url));
	let container = $state<HTMLElement | null>(null);

	const ensurePinterestScript = async () => {
		if (typeof window === 'undefined') {
			return;
		}

		const existingScript = document.querySelector<HTMLScriptElement>(
			'script[data-sveltekit-embeds-script="pinterest"]'
		);
		if (existingScript) {
			await new Promise<void>((resolve, reject) => {
				existingScript.addEventListener('load', () => resolve(), { once: true });
				existingScript.addEventListener('error', () => reject(new Error('Failed to load Pinterest script')), {
					once: true
				});
			});
			return;
		}

		await new Promise<void>((resolve, reject) => {
			const script = document.createElement('script');
			script.src = 'https://assets.pinterest.com/js/pinit.js';
			script.async = true;
			script.dataset.sveltekitEmbedsScript = 'pinterest';
			script.onload = () => resolve();
			script.onerror = () => reject(new Error('Failed to load Pinterest script'));
			document.head.appendChild(script);
		});
	};

	$effect(() => {
		if (!container || !postUrl || typeof window === 'undefined') {
			return;
		}

		let destroyed = false;

		const render = async () => {
			try {
				await ensurePinterestScript();
				if (destroyed || !container) {
					return;
				}

				container.innerHTML = `<a data-pin-do="embedPin" href="${postUrl}"></a>`;
				const pinterestWindow = window as PinterestWindow;
				pinterestWindow.PinUtils?.build();
			} catch {
				if (container) {
					container.innerHTML = `<a href="${postUrl}" rel="noopener noreferrer" target="_blank">${postUrl}</a>`;
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
