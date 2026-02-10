export const extractDailymotionId = (url: string): string | null => {
	try {
		const urlObj = new URL(url);
		const hostname = urlObj.hostname.toLowerCase();

		if (hostname.includes('dai.ly')) {
			return urlObj.pathname.split('/').filter(Boolean)[0] ?? null;
		}

		const match = urlObj.pathname.match(/\/video\/([a-zA-Z0-9]+)/);
		return match?.[1] ?? null;
	} catch {
		return null;
	}
};

export const getDailymotionEmbedUrl = (url: string): string | null => {
	const id = extractDailymotionId(url);
	if (!id) {
		return null;
	}

	return `https://www.dailymotion.com/embed/video/${id}`;
};
