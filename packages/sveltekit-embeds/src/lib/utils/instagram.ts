export const extractInstagramId = (url: string): string | null => {
	try {
		const urlObj = new URL(url);
		const hostname = urlObj.hostname.toLowerCase();
		if (!hostname.includes('instagram.com')) {
			return null;
		}

		const match = urlObj.pathname.match(/\/(?:p|reel|tv)\/([^/?#]+)/);
		return match?.[1] ?? null;
	} catch {
		return null;
	}
};

export const getInstagramEmbedUrl = (url: string): string | null => {
	const postId = extractInstagramId(url);
	if (!postId) {
		return null;
	}

	return `https://www.instagram.com/p/${postId}/embed`;
};
