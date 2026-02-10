export interface BlueskyUrlInfo {
	handle: string;
	postId: string;
	isValid: boolean;
	originalUrl: string;
}

export const parseBlueskyUrl = (url: string): BlueskyUrlInfo => {
	const fallback: BlueskyUrlInfo = {
		handle: '',
		postId: '',
		isValid: false,
		originalUrl: url
	};

	try {
		const urlObj = new URL(url);
		const hostname = urlObj.hostname.toLowerCase();
		if (!hostname.includes('bsky.app')) {
			return fallback;
		}

		const match = urlObj.pathname.match(/\/profile\/([^/]+)\/post\/([^/?#]+)/);
		if (!match?.[1] || !match?.[2]) {
			return fallback;
		}

		return {
			handle: match[1],
			postId: match[2],
			isValid: true,
			originalUrl: url
		};
	} catch {
		return fallback;
	}
};

export const getBlueskyEmbedUrl = (url: string): string | null => {
	const info = parseBlueskyUrl(url);
	if (!info.isValid) {
		return null;
	}

	return `https://embed.bsky.app/embed/${info.handle}/post/${info.postId}`;
};
