export interface SoundCloudUrlInfo {
	isValid: boolean;
	originalUrl: string;
}

export const isValidSoundCloudUrl = (url: string): boolean => {
	if (!url) {
		return false;
	}

	try {
		const urlObj = new URL(url);
		return urlObj.hostname.includes('soundcloud.com');
	} catch {
		return false;
	}
};

export const parseSoundCloudUrl = (url: string): SoundCloudUrlInfo => ({
	isValid: isValidSoundCloudUrl(url),
	originalUrl: url
});

export const getSoundCloudEmbedUrl = (
	url: string,
	options?: {
		color?: string;
		autoPlay?: boolean;
		showComments?: boolean;
	}
): string | null => {
	if (!isValidSoundCloudUrl(url)) {
		return null;
	}

	const encodedUrl = encodeURIComponent(url);
	const color = (options?.color ?? 'ff5500').replace('#', '');
	const autoPlay = options?.autoPlay ? 'true' : 'false';
	const showComments = options?.showComments === false ? 'false' : 'true';

	return `https://w.soundcloud.com/player/?url=${encodedUrl}&color=%23${color}&auto_play=${autoPlay}&show_comments=${showComments}`;
};
