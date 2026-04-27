# Project Philosophy: Cleanest SvelteKit Setup

**skeletoni** is a reference skeleton for the cleanest possible SvelteKit project.
Every decision must serve clarity, minimalism, and idiomatic SvelteKit — nothing more.

## Core Principle

> If it doesn't need to exist, it doesn't exist.

## Rules

### Dependencies
- Zero unnecessary packages. Each dep must earn its place.
- Prefer SvelteKit built-ins over third-party libs when equivalent.
- No utility libraries (lodash, etc.) — use native JS/TS.
- No UI component libraries unless explicitly requested.

### Code
- No abstractions for single-use code.
- No speculative utilities or helpers "for later."
- No barrel files (`index.ts`) unless the export surface genuinely warrants it.
- Strict TypeScript — no `any`, no `// @ts-ignore`.
- Match SvelteKit idioms: `+page.svelte`, `+layout.server.ts`, `$lib`, `$env`, etc.

### File Structure
- Organize by SvelteKit convention, not by file type.
- Flat where possible. Nest only when grouping is genuinely meaningful.
- No empty placeholder files or commented-out stubs.

### Style
- Scoped `<style>` in Svelte components by default.
- Global CSS only for true global concerns (reset, tokens, body).
- CSS custom properties for design tokens.

### Comments
- Comment when something is **non-obvious** — the *why*, the *gotcha*, the *workaround*.
- Never describe what a function or class does in a comment — the name does that.
- Never add comments like `// increment counter` or `// return user`.
- Good comment: `// SvelteKit requires this to be a module, even if empty`
- Bad comment: `// This function fetches the user`

### What to Avoid
- Wrapper components that add no behavior.
- Config files for tools not in use.
- Comments describing obvious code (code speaks for itself).
- Dead code, unused imports, orphaned files.

## When in Doubt

Ask: *"Would this belong in the cleanest SvelteKit repo on GitHub?"*
If no → remove it.
