export interface LinkedInUrlInfo {
	postId: string;
	isValid: boolean;
	originalUrl: string;
}

export const extractLinkedInPostId = (url: string): string | null => {
	try {
		const urlObj = new URL(url);
		const hostname = urlObj.hostname.toLowerCase();
		if (!hostname.includes('linkedin.com')) {
			return null;
		}

		const activityId = urlObj.pathname.match(/urn:li:activity:(\d+)/)?.[1];
		if (activityId) {
			return activityId;
		}

		const ugcPostId = urlObj.pathname.match(/urn:li:ugcPost:(\d+)/)?.[1];
		if (ugcPostId) {
			return ugcPostId;
		}

		return null;
	} catch {
		return null;
	}
};

export const getLinkedInEmbedUrl = (url: string): string | null => {
	try {
		const urlObj = new URL(url);
		const hostname = urlObj.hostname.toLowerCase();
		if (!hostname.includes('linkedin.com')) {
			return null;
		}

		const path = urlObj.pathname.replace(/\/$/, '');
		if (!path.includes('/feed/update/')) {
			return null;
		}

		return `https://www.linkedin.com/embed${path}`;
	} catch {
		return null;
	}
};
