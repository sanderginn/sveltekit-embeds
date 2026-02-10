<script lang="ts">
	import {
		AppleMusic,
		ApplePodcasts,
		Bluesky,
		Dailymotion,
		Deezer,
		Instagram,
		LinkedIn,
		Mastodon,
		Pinterest,
		Reddit,
		SoundCloud,
		Spotify,
		Threads,
		Tidal,
		TikTok,
		Twitch,
		XEmbed,
		YouTube
	} from 'sveltekit-embeds';
</script>

<main>
	<h1>SvelteKit Embeds Demo</h1>
	<p>20 live embed examples powered by the local workspace package.</p>

	<section class="grid">
		<article><h2>YouTube</h2><YouTube url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" /></article>
		<article><h2>YouTube Shorts</h2><YouTube url="https://www.youtube.com/shorts/aqz-KE-bpKQ" /></article>
		<article><h2>TikTok</h2><TikTok url="https://www.tiktok.com/@scout2015/video/6718335390845095173" /></article>
		<article><h2>Twitch</h2><Twitch url="https://www.twitch.tv/videos/106400740" /></article>
		<article><h2>Dailymotion</h2><Dailymotion url="https://www.dailymotion.com/video/x7tgczg" /></article>
		<article><h2>Spotify Track</h2><Spotify url="https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC" /></article>
		<article><h2>Spotify Playlist</h2><Spotify url="https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M" /></article>
		<article><h2>Apple Music</h2><AppleMusic url="https://music.apple.com/us/album/thriller/269572838" /></article>
		<article><h2>Apple Podcasts</h2><ApplePodcasts url="https://podcasts.apple.com/us/podcast/the-daily/id1200361736" /></article>
		<article><h2>SoundCloud</h2><SoundCloud url="https://soundcloud.com/odesza/line-of-sight-feat-wynne-mansionair" /></article>
		<article><h2>Deezer</h2><Deezer url="https://www.deezer.com/us/track/3135556" /></article>
		<article><h2>Tidal</h2><Tidal url="https://tidal.com/browse/track/77646474" /></article>
		<article><h2>X (Twitter)</h2><XEmbed url="https://x.com/jack/status/20" /></article>
		<article><h2>Instagram</h2><Instagram url="https://www.instagram.com/p/C5E1A12B3CD/" /></article>
		<article><h2>Threads</h2><Threads url="https://www.threads.net/@zuck/post/C5rI2XWSGf9" /></article>
		<article><h2>Bluesky</h2><Bluesky url="https://bsky.app/profile/bsky.app/post/3k4duaz5vgs2c" /></article>
		<article><h2>Mastodon</h2><Mastodon url="https://mastodon.social/@Mastodon/110000000000000000" /></article>
		<article><h2>LinkedIn</h2><LinkedIn url="https://www.linkedin.com/feed/update/urn:li:activity:7080000000000000000/" /></article>
		<article><h2>Reddit</h2><Reddit url="https://www.reddit.com/r/sveltejs/comments/1bovm3t/svelte_5_is_coming/" /></article>
		<article><h2>Pinterest</h2><Pinterest url="https://www.pinterest.com/pin/99360735500167749/" /></article>
	</section>
</main>

<style>
	main {
		max-width: 1100px;
		margin: 0 auto;
		padding: 2rem 1rem 4rem;
	}

	h1 {
		margin: 0;
		font-size: 2rem;
	}

	p {
		margin: 0.5rem 0 1.5rem;
		color: #475569;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: 1rem;
	}

	article {
		padding: 1rem;
		border: 1px solid #e2e8f0;
		border-radius: 0.75rem;
		background: #fff;
		box-shadow: 0 2px 6px rgba(15, 23, 42, 0.06);
	}

	h2 {
		margin: 0 0 0.75rem;
		font-size: 0.95rem;
		color: #0f172a;
	}
</style>
