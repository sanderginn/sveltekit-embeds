# sveltekit-embeds

Svelte 5 embed component library for media and social platforms.

## What you get

- Lazy-loaded embeds via `GeneralObserver` (IntersectionObserver-based)
- URL parsing and embed URL helpers in `src/lib/utils`
- Iframe embeds and script-injection embeds in `src/lib/components`
- TypeScript + Svelte package output (`dist/`) via `svelte-package`

## Exported components

- `GeneralObserver`
- `YouTube`, `TikTok`, `Twitch`, `Dailymotion`
- `Spotify`, `AppleMusic`, `ApplePodcasts`, `SoundCloud`, `Deezer`, `Tidal`
- `XEmbed`, `Instagram`, `Threads`, `Bluesky`, `Mastodon`, `LinkedIn`, `Reddit`, `Pinterest`

Utilities are also re-exported from `src/lib/utils`.

## Usage

```svelte
<script lang="ts">
	import { YouTube, Spotify, XEmbed } from 'sveltekit-embeds';
</script>

<YouTube url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />
<Spotify url="https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC" />
<XEmbed url="https://x.com/jack/status/20" />
```

Most components support:

- `url` (required)
- `disable_observer` (optional, bypass lazy loading)
- sizing/style props (varies per component, see component files)

## Local development

From the repository root:

```bash
pnpm install
pnpm --filter sveltekit-embeds dev
```

Run static checks:

```bash
pnpm --filter sveltekit-embeds check
```

Run tests (server utils + browser component tests):

```bash
pnpm --filter sveltekit-embeds test:unit
```

Build package output and run publint:

```bash
pnpm --filter sveltekit-embeds prepack
```

## Testing notes

- Browser component tests use `vitest-browser-svelte` + Playwright Chromium.
- First run may download browser binaries:

```bash
pnpm --filter sveltekit-embeds exec playwright install chromium
```
