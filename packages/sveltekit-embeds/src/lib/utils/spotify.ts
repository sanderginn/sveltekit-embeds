export type SpotifyItemType =
	| 'track'
	| 'album'
	| 'playlist'
	| 'artist'
	| 'show'
	| 'episode'
	| 'user';

export interface SpotifyUrlInfo {
	id: string;
	type: SpotifyItemType;
	isValid: boolean;
	originalUrl: string;
}

const SPOTIFY_TYPES: SpotifyItemType[] = [
	'track',
	'album',
	'playlist',
	'artist',
	'show',
	'episode',
	'user'
];

export const isValidSpotifyUrl = (url: string): boolean => {
	if (!url) {
		return false;
	}

	try {
		const urlObj = new URL(url);
		return urlObj.hostname.includes('spotify.com');
	} catch {
		return false;
	}
};

export const parseSpotifyUrl = (url: string): SpotifyUrlInfo => {
	const fallback: SpotifyUrlInfo = {
		id: '',
		type: 'track',
		isValid: false,
		originalUrl: url
	};

	if (!isValidSpotifyUrl(url)) {
		return fallback;
	}

	try {
		const urlObj = new URL(url);
		const rawPathParts = urlObj.pathname.split('/').filter(Boolean);
		const pathParts = rawPathParts.filter((part) => !/^intl-[a-z]{2}$/i.test(part));

		if (pathParts[0] === 'embed' && pathParts[1] && pathParts[2]) {
			const type = pathParts[1] as SpotifyItemType;
			if (SPOTIFY_TYPES.includes(type)) {
				return {
					id: pathParts[2],
					type,
					isValid: true,
					originalUrl: url
				};
			}
		}

		if (pathParts[0] && pathParts[1]) {
			const type = pathParts[0] as SpotifyItemType;
			if (SPOTIFY_TYPES.includes(type)) {
				return {
					id: pathParts[1],
					type,
					isValid: true,
					originalUrl: url
				};
			}
		}

		return fallback;
	} catch {
		return fallback;
	}
};

export const getSpotifyEmbedUrl = (url: string, theme: 'light' | 'dark' = 'light'): string | null => {
	const info = parseSpotifyUrl(url);
	if (!info.isValid) {
		return null;
	}

	const themeParam = theme === 'dark' ? '&theme=0' : '';
	return `https://open.spotify.com/embed/${info.type}/${info.id}?utm_source=generator${themeParam}`;
};
