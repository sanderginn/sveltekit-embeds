export const extractPinterestId = (url: string): string | null => {
	try {
		const urlObj = new URL(url);
		const hostname = urlObj.hostname.toLowerCase();
		if (!hostname.includes('pinterest.') && hostname !== 'pin.it') {
			return null;
		}

		const match = urlObj.pathname.match(/\/pin\/(\d+)/);
		return match?.[1] ?? null;
	} catch {
		return null;
	}
};

export const getPinterestPostUrl = (url: string): string | null => {
	const pinId = extractPinterestId(url);
	if (!pinId) {
		return null;
	}

	return `https://www.pinterest.com/pin/${pinId}/`;
};
