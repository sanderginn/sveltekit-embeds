import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-svelte';

import Bluesky from './bluesky.svelte';

describe('Bluesky', () => {
	it('renders an iframe with bluesky embed source', async () => {
		render(Bluesky, {
			url: 'https://bsky.app/profile/alice.com/post/3k2abcd',
			disable_observer: true
		});

		const iframe = page.getByTitle('bluesky-alice.com-3k2abcd');
		await expect.element(iframe).toHaveAttribute(
			'src',
			'https://embed.bsky.app/embed/alice.com/post/3k2abcd'
		);
	});
});
