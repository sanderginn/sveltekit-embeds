import adapter from '@sveltejs/adapter-auto';
import { fileURLToPath } from 'node:url';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		alias: {
			'sveltekit-embeds': fileURLToPath(
				new URL('../../packages/sveltekit-embeds/src/lib/index.ts', import.meta.url)
			)
		},
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter()
	}
};

export default config;
