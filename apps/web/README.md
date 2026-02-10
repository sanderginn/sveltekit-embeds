# `apps/web` demo

Demo app for `sveltekit-embeds`.

It imports the local workspace package and renders a gallery of embed examples so you can quickly smoke test behavior in a browser.

## Run the demo

From repository root:

```bash
pnpm install
pnpm dev:web
```

Or from `apps/web`:

```bash
pnpm dev
```

## What this app is for

- Manual visual checks for iframe/script embeds
- Quick iteration while developing components in `packages/sveltekit-embeds`
- Verifying workspace package resolution in dev mode

## Helpful commands

Type-check the demo app:

```bash
pnpm --filter web check
```

Build preview bundle:

```bash
pnpm --filter web build
pnpm --filter web preview
```

## Notes

- The app resolves `sveltekit-embeds` to local workspace source during development.
- Some third-party embeds can be blocked by region/cookies/network policies; that does not necessarily indicate a component bug.
