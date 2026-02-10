export const extractRedditPostId = (rawUrl: string): string | null => {
	const trimmed = rawUrl.trim();
	if (!trimmed) {
		return null;
	}

	try {
		const url = new URL(trimmed);
		const hostname = url.hostname.replace(/^www\./, '');
		const pathParts = url.pathname.split('/').filter(Boolean);

		if (hostname === 'redd.it') {
			return pathParts[0] ?? null;
		}

		const commentsIndex = pathParts.indexOf('comments');
		if (commentsIndex !== -1) {
			return pathParts[commentsIndex + 1] ?? null;
		}

		return null;
	} catch {
		return null;
	}
};

export const getRedditEmbedUrl = (rawUrl: string, theme: 'light' | 'dark' = 'light'): string | null => {
	try {
		const url = new URL(rawUrl);
		const hostname = url.hostname.replace(/^www\./, '');
		if (hostname !== 'reddit.com' && hostname !== 'redd.it') {
			return null;
		}

		const id = extractRedditPostId(rawUrl);
		if (!id) {
			return null;
		}

		const pathParts = url.pathname.split('/').filter(Boolean);
		const commentsIndex = pathParts.indexOf('comments');
		if (commentsIndex !== -1 && pathParts.length >= commentsIndex + 2) {
			const embedPath = `/${pathParts.slice(0, commentsIndex + 2).join('/')}/embed`;
			return `https://www.reddit.com${embedPath}?theme=${theme}`;
		}

		return `https://www.reddit.com/comments/${id}/embed?theme=${theme}`;
	} catch {
		return null;
	}
};
