export interface ThreadsUrlInfo {
	username: string;
	postId: string;
	isValid: boolean;
	originalUrl: string;
}

export const extractThreadsId = (url: string): string | null => {
	try {
		const urlObj = new URL(url);
		const hostname = urlObj.hostname.toLowerCase();
		if (!hostname.includes('threads.net')) {
			return null;
		}

		return urlObj.pathname.match(/\/post\/([^/?#]+)/)?.[1] ?? null;
	} catch {
		return null;
	}
};

export const parseThreadsUrl = (url: string): ThreadsUrlInfo => {
	const fallback: ThreadsUrlInfo = {
		username: '',
		postId: '',
		isValid: false,
		originalUrl: url
	};

	try {
		const urlObj = new URL(url);
		const hostname = urlObj.hostname.toLowerCase();
		if (!hostname.includes('threads.net')) {
			return fallback;
		}

		const username = urlObj.pathname.match(/\/@([^/]+)/)?.[1] ?? '';
		const postId = urlObj.pathname.match(/\/post\/([^/?#]+)/)?.[1] ?? '';
		if (!username || !postId) {
			return fallback;
		}

		return {
			username,
			postId,
			isValid: true,
			originalUrl: url
		};
	} catch {
		return fallback;
	}
};

export const getThreadsPostUrl = (url: string): string | null => {
	const info = parseThreadsUrl(url);
	if (!info.isValid) {
		return null;
	}

	return `https://www.threads.net/@${info.username}/post/${info.postId}`;
};
