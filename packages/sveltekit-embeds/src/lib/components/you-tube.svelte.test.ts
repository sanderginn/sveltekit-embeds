import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-svelte';

import YouTube from './you-tube.svelte';

describe('YouTube', () => {
	it('renders an iframe with the expected embed url', async () => {
		render(YouTube, {
			url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
			start: 30,
			disable_observer: true
		});

		const iframe = page.getByTitle('youtube-dQw4w9WgXcQ');
		await expect.element(iframe).toHaveAttribute(
			'src',
			'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&mute=0&controls=1&start=30'
		);
	});
});
