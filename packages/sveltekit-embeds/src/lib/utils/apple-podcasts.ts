export type ApplePodcastsItemType = 'show' | 'episode';

export interface ApplePodcastsUrlInfo {
	id: string;
	type: ApplePodcastsItemType;
	country: string;
	isValid: boolean;
	originalUrl: string;
}

export const isValidApplePodcastsUrl = (url: string): boolean => {
	if (!url) {
		return false;
	}

	try {
		const urlObj = new URL(url);
		return urlObj.hostname.includes('podcasts.apple.com');
	} catch {
		return false;
	}
};

export const parseApplePodcastsUrl = (url: string): ApplePodcastsUrlInfo => {
	const fallback: ApplePodcastsUrlInfo = {
		id: '',
		type: 'show',
		country: '',
		isValid: false,
		originalUrl: url
	};

	if (!isValidApplePodcastsUrl(url)) {
		return fallback;
	}

	try {
		const urlObj = new URL(url);
		const pathParts = urlObj.pathname.split('/').filter(Boolean);
		const country = pathParts[0] ?? '';
		const episodeId = urlObj.searchParams.get('i');
		const showId = urlObj.pathname.match(/\/id(\d+)/)?.[1] ?? '';
		const id = episodeId || showId;

		return {
			id,
			type: episodeId ? 'episode' : 'show',
			country,
			isValid: Boolean(id),
			originalUrl: url
		};
	} catch {
		return fallback;
	}
};

export const getApplePodcastsEmbedUrl = (
	url: string,
	theme: 'light' | 'dark' = 'light'
): string | null => {
	if (!isValidApplePodcastsUrl(url)) {
		return null;
	}

	try {
		const embedUrl = new URL(url);
		embedUrl.hostname = 'embed.podcasts.apple.com';
		embedUrl.searchParams.set('theme', theme);
		return embedUrl.toString();
	} catch {
		return null;
	}
};
