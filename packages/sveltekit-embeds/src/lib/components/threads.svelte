<script lang="ts">
	import GeneralObserver from './general-observer.svelte';
	import { getThreadsPostUrl } from '../utils/threads.js';

	interface Props {
		url: string;
		disable_observer?: boolean;
	}

	type ThreadsWindow = Window & {
		instgrm?: {
			Embeds?: {
				process: () => void;
			};
		};
	};

	let { url, disable_observer = false }: Props = $props();
	const postUrl = $derived(getThreadsPostUrl(url));
	let container = $state<HTMLElement | null>(null);

	const ensureThreadsScript = async () => {
		if (typeof window === 'undefined') {
			return;
		}

		const existingScript = document.querySelector<HTMLScriptElement>(
			'script[data-sveltekit-embeds-script="threads"]'
		);
		if (existingScript) {
			await new Promise<void>((resolve, reject) => {
				existingScript.addEventListener('load', () => resolve(), { once: true });
				existingScript.addEventListener('error', () => reject(new Error('Failed to load Threads script')), {
					once: true
				});
			});
			return;
		}

		await new Promise<void>((resolve, reject) => {
			const script = document.createElement('script');
			script.src = 'https://www.threads.net/embed.js';
			script.async = true;
			script.dataset.sveltekitEmbedsScript = 'threads';
			script.onload = () => resolve();
			script.onerror = () => reject(new Error('Failed to load Threads script'));
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
				await ensureThreadsScript();
				if (destroyed || !container) {
					return;
				}

				container.innerHTML = `<blockquote class="text-post-media"><a href="${postUrl}"></a></blockquote>`;
				const threadsWindow = window as ThreadsWindow;
				threadsWindow.instgrm?.Embeds?.process();
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
