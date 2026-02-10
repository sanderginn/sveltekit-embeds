export interface MastodonUrlInfo {
	instance: string;
	path: string;
	isValid: boolean;
	originalUrl: string;
}

export const parseMastodonUrl = (url: string): MastodonUrlInfo => {
	const fallback: MastodonUrlInfo = {
		instance: '',
		path: '',
		isValid: false,
		originalUrl: url
	};

	try {
		const urlObj = new URL(url);
		const path = urlObj.pathname.replace(/\/$/, '');
		if (!path.includes('/@')) {
			return fallback;
		}

		return {
			instance: urlObj.origin,
			path,
			isValid: true,
			originalUrl: url
		};
	} catch {
		return fallback;
	}
};

export const getMastodonEmbedInfo = (
	url: string
): { scriptUrl: string; embedUrl: string; instance: string } | null => {
	const info = parseMastodonUrl(url);
	if (!info.isValid) {
		return null;
	}

	const embedPath = info.path.endsWith('/embed') ? info.path : `${info.path}/embed`;

	return {
		scriptUrl: `${info.instance}/embed.js`,
		embedUrl: `${info.instance}${embedPath}`,
		instance: info.instance
	};
};
