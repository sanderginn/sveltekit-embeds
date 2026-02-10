import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-svelte';

import Spotify from './spotify.svelte';

describe('Spotify', () => {
	it('renders an iframe with parsed spotify embed source', async () => {
		render(Spotify, {
			url: 'https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC',
			disable_observer: true
		});

		const iframe = page.getByTitle('spotify-track-4uLU6hMCjMI75M1A2tKUQC');
		await expect.element(iframe).toHaveAttribute(
			'src',
			'https://open.spotify.com/embed/track/4uLU6hMCjMI75M1A2tKUQC?utm_source=generator'
		);
	});
});
