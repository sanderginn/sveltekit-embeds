export const extractTikTokVideoId = (url: string): string | null => {
	try {
		const urlObj = new URL(url);
		const path = urlObj.pathname;
		const match = path.match(/\/video\/(\d+)/) || path.match(/\/v\/(\d+)/);

		return match?.[1] ?? null;
	} catch {
		return null;
	}
};

export const getTikTokEmbedUrl = (url: string): string | null => {
	const id = extractTikTokVideoId(url);
	if (!id) {
		return null;
	}

	return `https://www.tiktok.com/player/v1/${id}`;
};
