export const extractYouTubeVideoId = (rawUrl: string): string | null => {
	try {
		const url = new URL(rawUrl);
		const hostname = url.hostname.replace(/^www\./, '');

		if (hostname === 'youtu.be') {
			return url.pathname.slice(1).split('/')[0] || null;
		}

		if (hostname === 'youtube.com' || hostname === 'm.youtube.com') {
			const vParam = url.searchParams.get('v');
			if (vParam) {
				return vParam;
			}

			const pathParts = url.pathname.split('/').filter(Boolean);
			if (pathParts.length < 2) {
				return null;
			}

			if (['shorts', 'embed', 'v', 'live'].includes(pathParts[0] ?? '')) {
				return pathParts[1] ?? null;
			}
		}
	} catch {
		return null;
	}

	return null;
};

export const normalizeYouTubeUrl = (rawUrl: string): string => {
	const videoId = extractYouTubeVideoId(rawUrl);
	if (!videoId) {
		return rawUrl;
	}

	return `https://www.youtube.com/watch?v=${videoId}`;
};

export const getYouTubeEmbedUrl = (rawUrl: string): string | null => {
	const videoId = extractYouTubeVideoId(rawUrl);
	if (!videoId) {
		return null;
	}

	return `https://www.youtube.com/embed/${videoId}`;
};
