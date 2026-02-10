const PADDING_BY_ASPECT_RATIO: Record<string, string> = {
	'1:1': 'padding-top: 100%;',
	'16:9': 'padding-top: 56.25%;',
	'4:3': 'padding-top: 75%;',
	'3:2': 'padding-top: 66.66%;'
};

export const getPadding = (aspectRatio = '16:9'): string =>
	PADDING_BY_ASPECT_RATIO[aspectRatio] ?? PADDING_BY_ASPECT_RATIO['16:9'];

export * from './youtube.js';
export * from './spotify.js';
export * from './tiktok.js';
export * from './twitch.js';
export * from './dailymotion.js';
export * from './apple-music.js';
export * from './apple-podcasts.js';
export * from './soundcloud.js';
export * from './deezer.js';
export * from './tidal.js';
export * from './twitter.js';
export * from './instagram.js';
export * from './threads.js';
export * from './bluesky.js';
export * from './mastodon.js';
export * from './linkedin.js';
export * from './reddit.js';
export * from './pinterest.js';
