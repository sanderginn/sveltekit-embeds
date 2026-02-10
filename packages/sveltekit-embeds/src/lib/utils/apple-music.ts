export type AppleMusicItemType = 'song' | 'album' | 'playlist' | 'artist' | 'station' | 'music-video';

export interface AppleMusicUrlInfo {
	id: string;
	type: AppleMusicItemType;
	country: string;
	isValid: boolean;
	originalUrl: string;
}

export const isValidAppleMusicUrl = (url: string): boolean => {
	if (!url) {
		return false;
	}

	try {
		const urlObj = new URL(url);
		return urlObj.hostname.includes('music.apple.com');
	} catch {
		return false;
	}
};

export const parseAppleMusicUrl = (url: string): AppleMusicUrlInfo => {
	const fallback: AppleMusicUrlInfo = {
		id: '',
		type: 'song',
		country: '',
		isValid: false,
		originalUrl: url
	};

	if (!isValidAppleMusicUrl(url)) {
		return fallback;
	}

	try {
		const urlObj = new URL(url);
		const pathParts = urlObj.pathname.split('/').filter(Boolean);

		if (pathParts.length < 3) {
			return fallback;
		}

		const country = pathParts[0] ?? '';
		const type = (pathParts[1] ?? 'song') as AppleMusicItemType;
		const id = pathParts[pathParts.length - 1] ?? '';
		const songId = urlObj.searchParams.get('i');

		return {
			id,
			type: songId ? 'song' : type,
			country,
			isValid: Boolean(id),
			originalUrl: url
		};
	} catch {
		return fallback;
	}
};

export const getAppleMusicEmbedUrl = (url: string, theme: 'light' | 'dark' = 'light'): string | null => {
	if (!isValidAppleMusicUrl(url)) {
		return null;
	}

	try {
		const embedUrl = new URL(url);
		embedUrl.hostname = 'embed.music.apple.com';
		embedUrl.searchParams.set('theme', theme);
		return embedUrl.toString();
	} catch {
		return null;
	}
};
