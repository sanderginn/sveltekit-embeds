export const extractTweetId = (url: string): string | null => {
	if (!url) {
		return null;
	}

	try {
		const urlObj = new URL(url);
		const hostname = urlObj.hostname.toLowerCase();
		if (!hostname.includes('twitter.com') && !hostname.includes('x.com')) {
			return null;
		}

		return urlObj.pathname.match(/\/status(?:es)?\/(\d+)/)?.[1] ?? null;
	} catch {
		return null;
	}
};

export const normalizeTwitterUrl = (url: string): string => {
	const tweetId = extractTweetId(url);
	if (!tweetId) {
		return url;
	}

	try {
		const urlObj = new URL(url);
		const pathParts = urlObj.pathname.split('/');
		const statusIndex = pathParts.findIndex((part) => part === 'status' || part === 'statuses');
		const username = statusIndex > 0 ? pathParts[statusIndex - 1] : '';

		if (!username) {
			return url;
		}

		return `https://x.com/${username}/status/${tweetId}`;
	} catch {
		return url;
	}
};
