# Cerebrum

> OpenWolf's learning memory. Updated automatically as the AI learns from interactions.
> Do not edit manually unless correcting an error.
> Last updated: 2026-04-27

## User Preferences

- **Ambiguity:** Always ask — never guess or assume intent. One question beats a wrong implementation.
- **Research:** Verify against current docs before using any API/lib feature. No try-and-see. Always check current versions — never rely on training data for version numbers.
- **Testing:** Test use-cases and program flow. No exhaustive getter/setter unit tests. TDD when suitable. Temporary tests to verify behavior are fine — better than guessing 20 times.
- **Git:** Commit every small increment. Never start new task with uncommitted work. **Never push without explicit user yes.**
- **Rules:** Check all rules before acting. Update rules/cerebrum immediately after any correction or new learning.
- **Documentation:** Official docs are primary source — always use current version.
- **Comments:** Only when non-obvious. Explain the *why*, never the *what*. Names speak for themselves.
- **Package manager:** pnpm. Always use pnpm, never npm or yarn.
- **Svelte:** Runes mode, all-in. No legacy options API, no `$:`, no `export let` props — use `$props()`, `$state()`, `$derived()`, `$effect()`.
- **Refactoring:** If a refactor or component extraction makes sense, do it. Don't wait for permission.
- **Versions:** Always research current latest stable before installing. Never assume.

## Key Learnings

- **Project:** skeletoni — reference skeleton for the cleanest possible SvelteKit project setup
- **Goal:** Minimal, idiomatic, zero bloat. Every file and dep must earn its place.
- **Rules files:** `.claude/rules/project-philosophy.md` (technical) + `.claude/rules/working-principles.md` (process) — read before any action.
- **Working principles summary:** Ask when unsure. Research before acting (always current docs). Rules > instinct. Test flow not getters. Commit each increment. Update rules/cerebrum after every learning.

## Do-Not-Repeat

<!-- Mistakes made and corrected. Each entry prevents the same mistake recurring. -->
<!-- Format: [YYYY-MM-DD] Description of what went wrong and what to do instead. -->

## Decision Log

<!-- Significant technical decisions with rationale. Why X was chosen over Y. -->
- [2026-04-27] **Project purpose defined:** skeletoni = cleanest SvelteKit skeleton. Philosophy captured in `.claude/rules/project-philosophy.md`. All future decisions filtered through "minimum viable, idiomatic SvelteKit."
