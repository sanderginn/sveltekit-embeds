export interface TwitchUrlInfo {
	channel?: string;
	videoId?: string;
	clipSlug?: string;
	isValid: boolean;
	originalUrl: string;
}

const TWITCH_REGEX =
	/twitch\.tv\/(?:videos\/(\d+)|([a-zA-Z0-9_]+)(?:\/clip\/([a-zA-Z0-9-]+))?)|clips\.twitch\.tv\/([a-zA-Z0-9-]+)/;

export const parseTwitchUrl = (url: string): TwitchUrlInfo => {
	const fallback: TwitchUrlInfo = {
		isValid: false,
		originalUrl: url
	};

	const match = url.match(TWITCH_REGEX);
	if (!match) {
		return fallback;
	}

	const [, videoId, channel, clipSlugFromChannel, clipSlugDirect] = match;
	const clipSlug = clipSlugFromChannel || clipSlugDirect;

	return {
		videoId: videoId || undefined,
		channel: channel || undefined,
		clipSlug: clipSlug || undefined,
		isValid: true,
		originalUrl: url
	};
};

export const getTwitchEmbedUrl = (url: string, parent: string): string | null => {
	const info = parseTwitchUrl(url);
	if (!info.isValid) {
		return null;
	}

	const encodedParent = encodeURIComponent(parent);

	if (info.videoId) {
		return `https://player.twitch.tv/?video=v${info.videoId}&parent=${encodedParent}`;
	}

	if (info.channel) {
		return `https://player.twitch.tv/?channel=${info.channel}&parent=${encodedParent}`;
	}

	if (info.clipSlug) {
		return `https://clips.twitch.tv/embed?clip=${info.clipSlug}&parent=${encodedParent}`;
	}

	return null;
};
