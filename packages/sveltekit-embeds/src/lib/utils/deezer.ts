export type DeezerItemType = 'track' | 'album' | 'playlist' | 'artist' | 'podcast' | 'episode';

export interface DeezerUrlInfo {
	id: string;
	type: DeezerItemType;
	isValid: boolean;
	originalUrl: string;
}

const DEEZER_TYPES: DeezerItemType[] = ['track', 'album', 'playlist', 'artist', 'podcast', 'episode'];

export const isValidDeezerUrl = (url: string): boolean => {
	if (!url) {
		return false;
	}

	try {
		const urlObj = new URL(url);
		return urlObj.hostname.includes('deezer.com');
	} catch {
		return false;
	}
};

export const parseDeezerUrl = (url: string): DeezerUrlInfo => {
	const fallback: DeezerUrlInfo = {
		id: '',
		type: 'track',
		isValid: false,
		originalUrl: url
	};

	if (!isValidDeezerUrl(url)) {
		return fallback;
	}

	try {
		const urlObj = new URL(url);
		const pathParts = urlObj.pathname.split('/').filter(Boolean);
		const firstPart = pathParts[0] ?? '';
		const hasCountryPrefix = firstPart.length === 2 && !DEEZER_TYPES.includes(firstPart as DeezerItemType);
		const normalizedParts = hasCountryPrefix ? pathParts.slice(1) : pathParts;
		const type = (normalizedParts[0] ?? '') as DeezerItemType;
		const id = normalizedParts[1] ?? '';

		if (!DEEZER_TYPES.includes(type) || !id) {
			return fallback;
		}

		return {
			id,
			type,
			isValid: true,
			originalUrl: url
		};
	} catch {
		return fallback;
	}
};

export const getDeezerEmbedUrl = (url: string, theme: 'light' | 'dark' = 'light'): string | null => {
	const info = parseDeezerUrl(url);
	if (!info.isValid) {
		return null;
	}

	const themeSegment = theme === 'dark' ? 'dark' : 'light';
	if (info.type === 'artist') {
		return `https://widget.deezer.com/widget/${themeSegment}/artist/${info.id}/top_tracks`;
	}

	return `https://widget.deezer.com/widget/${themeSegment}/${info.type}/${info.id}`;
};
