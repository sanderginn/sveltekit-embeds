import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-svelte';

import GeneralObserver from './general-observer.svelte';

const observe = vi.fn();
const disconnect = vi.fn();

class MockIntersectionObserver {
	constructor(
		public callback: IntersectionObserverCallback,
		public options?: IntersectionObserverInit
	) {}
	observe = observe;
	disconnect = disconnect;
	unobserve = vi.fn();
	takeRecords = vi.fn(() => []);
	root = null;
	rootMargin = '0px';
	thresholds = [0];
}

beforeEach(() => {
	vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
});

afterEach(() => {
	vi.clearAllMocks();
	vi.unstubAllGlobals();
});

describe('GeneralObserver', () => {
	it('renders children immediately when observer is disabled', async () => {
		render(GeneralObserver, {
			disable_observer: true,
			children: (() => 'observer-disabled-content') as never
		});

		await expect.element(page.getByTestId('general-observer')).toBeInTheDocument();
		expect(observe).not.toHaveBeenCalled();
	});

	it('creates an observer when observer is enabled', () => {
		render(GeneralObserver, {
			disable_observer: false,
			children: (() => 'observer-enabled-content') as never
		});

		expect(observe).toHaveBeenCalledTimes(1);
	});
});
