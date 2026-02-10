import { describe, expect, it } from 'vitest';

import { getPadding } from './index.js';
import { getAppleMusicEmbedUrl, parseAppleMusicUrl } from './apple-music.js';
import { getApplePodcastsEmbedUrl, parseApplePodcastsUrl } from './apple-podcasts.js';
import { getBlueskyEmbedUrl, parseBlueskyUrl } from './bluesky.js';
import { extractDailymotionId, getDailymotionEmbedUrl } from './dailymotion.js';
import { getDeezerEmbedUrl, parseDeezerUrl } from './deezer.js';
import { extractInstagramId, getInstagramEmbedUrl } from './instagram.js';
import { extractLinkedInPostId, getLinkedInEmbedUrl } from './linkedin.js';
import { getMastodonEmbedInfo, parseMastodonUrl } from './mastodon.js';
import { extractPinterestId, getPinterestPostUrl } from './pinterest.js';
import { extractRedditPostId, getRedditEmbedUrl } from './reddit.js';
import { getSoundCloudEmbedUrl, parseSoundCloudUrl } from './soundcloud.js';
import { getSpotifyEmbedUrl, parseSpotifyUrl } from './spotify.js';
import { getThreadsPostUrl, parseThreadsUrl } from './threads.js';
import { getTidalEmbedUrl, parseTidalUrl } from './tidal.js';
import { extractTikTokVideoId, getTikTokEmbedUrl } from './tiktok.js';
import { getTwitchEmbedUrl, parseTwitchUrl } from './twitch.js';
import { extractTweetId, normalizeTwitterUrl } from './twitter.js';
import { extractYouTubeVideoId, getYouTubeEmbedUrl } from './youtube.js';

describe('getPadding', () => {
	it('returns configured ratios with default fallback', () => {
		expect(getPadding('16:9')).toBe('padding-top: 56.25%;');
		expect(getPadding('1:1')).toBe('padding-top: 100%;');
		expect(getPadding('unknown')).toBe('padding-top: 56.25%;');
	});
});

describe('youtube', () => {
	it('extracts ids and builds embed urls', () => {
		expect(extractYouTubeVideoId('https://www.youtube.com/watch?v=abc123')).toBe('abc123');
		expect(extractYouTubeVideoId('https://youtu.be/xyz987')).toBe('xyz987');
		expect(getYouTubeEmbedUrl('https://youtube.com/shorts/short999')).toBe(
			'https://www.youtube.com/embed/short999'
		);
	});
});

describe('spotify', () => {
	it('parses and embeds spotify urls', () => {
		expect(parseSpotifyUrl('https://open.spotify.com/track/123').isValid).toBe(true);
		expect(getSpotifyEmbedUrl('https://open.spotify.com/playlist/456', 'dark')).toContain(
			'open.spotify.com/embed/playlist/456'
		);
	});
});

describe('tiktok', () => {
	it('extracts tiktok ids and embed urls', () => {
		expect(extractTikTokVideoId('https://www.tiktok.com/@user/video/123456')).toBe('123456');
		expect(getTikTokEmbedUrl('https://www.tiktok.com/@user/video/123456')).toBe(
			'https://www.tiktok.com/player/v1/123456'
		);
	});
});

describe('twitch', () => {
	it('parses and builds twitch embed urls', () => {
		expect(parseTwitchUrl('https://www.twitch.tv/videos/1234').videoId).toBe('1234');
		expect(getTwitchEmbedUrl('https://www.twitch.tv/somechannel', 'localhost')).toContain(
			'player.twitch.tv/?channel=somechannel'
		);
	});
});

describe('dailymotion', () => {
	it('extracts dailymotion ids and embed urls', () => {
		expect(extractDailymotionId('https://www.dailymotion.com/video/x7tgad0')).toBe('x7tgad0');
		expect(getDailymotionEmbedUrl('https://dai.ly/x123')).toBe(
			'https://www.dailymotion.com/embed/video/x123'
		);
	});
});

describe('apple music', () => {
	it('parses and embeds apple music urls', () => {
		const parsed = parseAppleMusicUrl('https://music.apple.com/us/album/thriller/269572838');
		expect(parsed.isValid).toBe(true);
		expect(parsed.country).toBe('us');
		expect(getAppleMusicEmbedUrl('https://music.apple.com/us/album/thriller/269572838')).toContain(
			'embed.music.apple.com'
		);
	});
});

describe('apple podcasts', () => {
	it('parses and embeds apple podcasts urls', () => {
		const parsed = parseApplePodcastsUrl(
			'https://podcasts.apple.com/us/podcast/some-show/id1234567890'
		);
		expect(parsed.isValid).toBe(true);
		expect(getApplePodcastsEmbedUrl('https://podcasts.apple.com/us/podcast/some-show/id1234567890')).toContain(
			'embed.podcasts.apple.com'
		);
	});
});

describe('soundcloud', () => {
	it('parses and builds soundcloud embed urls', () => {
		expect(parseSoundCloudUrl('https://soundcloud.com/artist/track').isValid).toBe(true);
		expect(getSoundCloudEmbedUrl('https://soundcloud.com/artist/track', { autoPlay: true })).toContain(
			'auto_play=true'
		);
	});
});

describe('deezer', () => {
	it('parses deezer urls and returns embed urls', () => {
		const parsed = parseDeezerUrl('https://www.deezer.com/us/album/302127');
		expect(parsed.id).toBe('302127');
		expect(getDeezerEmbedUrl('https://www.deezer.com/us/album/302127')).toContain(
			'widget.deezer.com/widget/light/album/302127'
		);
	});
});

describe('tidal', () => {
	it('parses tidal urls and returns embed urls', () => {
		const parsed = parseTidalUrl('https://tidal.com/browse/track/654321');
		expect(parsed.isValid).toBe(true);
		expect(getTidalEmbedUrl('https://tidal.com/browse/video/99')).toBe('https://embed.tidal.com/videos/99');
	});
});

describe('twitter', () => {
	it('extracts and normalizes tweet urls', () => {
		expect(extractTweetId('https://x.com/name/status/123456')).toBe('123456');
		expect(normalizeTwitterUrl('https://twitter.com/name/status/123456')).toBe(
			'https://x.com/name/status/123456'
		);
	});
});

describe('instagram', () => {
	it('extracts instagram ids and embed urls', () => {
		expect(extractInstagramId('https://www.instagram.com/p/Cxyz123/')).toBe('Cxyz123');
		expect(getInstagramEmbedUrl('https://www.instagram.com/reel/Cxyz123/')).toBe(
			'https://www.instagram.com/p/Cxyz123/embed'
		);
	});
});

describe('threads', () => {
	it('extracts thread post ids and parsed data', () => {
		expect(parseThreadsUrl('https://www.threads.net/@user/post/C1abc').isValid).toBe(true);
		expect(getThreadsPostUrl('https://threads.net/@user/post/C1abc')).toBe(
			'https://www.threads.net/@user/post/C1abc'
		);
	});
});

describe('bluesky', () => {
	it('parses bluesky urls and returns embed urls', () => {
		expect(parseBlueskyUrl('https://bsky.app/profile/alice.com/post/3j123').handle).toBe('alice.com');
		expect(getBlueskyEmbedUrl('https://bsky.app/profile/alice.com/post/3j123')).toBe(
			'https://embed.bsky.app/embed/alice.com/post/3j123'
		);
	});
});

describe('mastodon', () => {
	it('parses mastodon urls and returns embed info', () => {
		const parsed = parseMastodonUrl('https://mastodon.social/@alice/111111');
		expect(parsed.instance).toBe('https://mastodon.social');
		expect(getMastodonEmbedInfo('https://mastodon.social/@alice/111111')?.scriptUrl).toBe(
			'https://mastodon.social/embed.js'
		);
	});
});

describe('linkedin', () => {
	it('extracts linkedin post ids and embed urls', () => {
		const url = 'https://www.linkedin.com/feed/update/urn:li:activity:7080000000000000000/';
		expect(extractLinkedInPostId(url)).toBe('7080000000000000000');
		expect(getLinkedInEmbedUrl(url)).toBe(
			'https://www.linkedin.com/embed/feed/update/urn:li:activity:7080000000000000000'
		);
	});
});

describe('reddit', () => {
	it('extracts reddit post ids and embed urls', () => {
		const url = 'https://www.reddit.com/r/sveltejs/comments/abc123/a_post_title/';
		expect(extractRedditPostId(url)).toBe('abc123');
		expect(getRedditEmbedUrl(url, 'dark')).toBe(
			'https://www.reddit.com/r/sveltejs/comments/abc123/embed?theme=dark'
		);
	});
});

describe('pinterest', () => {
	it('extracts pinterest ids and canonical pin urls', () => {
		expect(extractPinterestId('https://www.pinterest.com/pin/123456789/')).toBe('123456789');
		expect(getPinterestPostUrl('https://www.pinterest.com/pin/123456789/')).toBe(
			'https://www.pinterest.com/pin/123456789/'
		);
	});
});
