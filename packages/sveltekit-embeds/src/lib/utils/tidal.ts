export type TidalItemType = 'track' | 'album' | 'playlist' | 'video' | 'artist';

export interface TidalUrlInfo {
	id: string;
	type: TidalItemType;
	isValid: boolean;
	originalUrl: string;
}

const TIDAL_TYPES: TidalItemType[] = ['track', 'album', 'playlist', 'video', 'artist'];

export const isValidTidalUrl = (url: string): boolean => {
	if (!url) {
		return false;
	}

	try {
		const urlObj = new URL(url);
		return urlObj.hostname.includes('tidal.com');
	} catch {
		return false;
	}
};

export const parseTidalUrl = (url: string): TidalUrlInfo => {
	const fallback: TidalUrlInfo = {
		id: '',
		type: 'track',
		isValid: false,
		originalUrl: url
	};

	if (!isValidTidalUrl(url)) {
		return fallback;
	}

	try {
		const urlObj = new URL(url);
		let pathParts = urlObj.pathname.split('/').filter(Boolean);

		if (pathParts[0] === 'browse') {
			pathParts = pathParts.slice(1);
		}

		const type = (pathParts[0] ?? '') as TidalItemType;
		const id = pathParts[1] ?? '';
		if (!TIDAL_TYPES.includes(type) || !id) {
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

export const getTidalEmbedUrl = (url: string): string | null => {
	const info = parseTidalUrl(url);
	if (!info.isValid || info.type === 'artist') {
		return null;
	}

	const embedType = info.type === 'video' ? 'videos' : `${info.type}s`;
	return `https://embed.tidal.com/${embedType}/${info.id}`;
};
