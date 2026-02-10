# sveltekit-embeds

Svelte 5 embed components for media and social platforms, built as a `pnpm` monorepo with:

- `packages/sveltekit-embeds`: the component library
- `apps/web`: a demo app that consumes the library via workspace linking

## Implemented platforms

The library currently includes components for:

- YouTube, TikTok, Twitch, Dailymotion
- Spotify, Apple Music, Apple Podcasts, SoundCloud, Deezer, Tidal
- X (Twitter), Instagram, Threads, Bluesky, Mastodon, LinkedIn, Reddit, Pinterest

All components support lazy rendering through `GeneralObserver`.

## Quick start

```bash
corepack enable
pnpm install
```

Run the library playground:

```bash
pnpm dev:lib
```

Run the demo app:

```bash
pnpm dev:web
```

## Validation commands

Run workspace checks:

```bash
pnpm check
```

Run library unit/browser tests:

```bash
pnpm --filter sveltekit-embeds test:unit
```

Build and lint the published library output:

```bash
pnpm --filter sveltekit-embeds prepack
```

## Publish to npm

Prerequisites:

- npm account and publish access
- logged in locally: `npm login`

Recommended release flow from repo root:

```bash
pnpm install
pnpm release:check
pnpm release:dry-run
pnpm --filter sveltekit-embeds version patch
pnpm release:publish
```

If you need a different semver bump, use `version minor` or `version major` instead of `version patch`.

## Workspace layout

```text
.
├── apps/
│   └── web/                   # Demo app
├── packages/
│   └── sveltekit-embeds/      # Library package
├── package.json               # Workspace scripts
└── pnpm-workspace.yaml
```

## More docs

- Library usage and API: `packages/sveltekit-embeds/README.md`
- Demo app notes: `apps/web/README.md`
