import { describe, expect, it } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-svelte';

import Instagram from './instagram.svelte';

describe('Instagram', () => {
	it('renders an iframe with instagram embed source', async () => {
		render(Instagram, {
			url: 'https://www.instagram.com/p/C5E1A12B3CD/',
			disable_observer: true
		});

		const iframe = page.getByTitle('instagram-C5E1A12B3CD');
		await expect.element(iframe).toHaveAttribute(
			'src',
			'https://www.instagram.com/p/C5E1A12B3CD/embed'
		);
	});
});
