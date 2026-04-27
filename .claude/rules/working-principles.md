# Working Principles

How work gets done in this project. Non-negotiable.

## Clarification First

- **Never guess intent.** If ambiguous, ask. One precise question beats a wrong implementation.
- **Know before doing.** If uncertain about what the user wants → stop, ask, confirm. Then act.

## Research Before Action

- **Always use current docs.** Before using any API, lib, or framework feature: verify against the latest version's documentation. Do not rely on training data for version-specific behavior.
- **Never try-and-see.** If unsure whether something works → research it first, then implement with confidence.
- **Documentation is a primary source.** Official docs > blog posts > Stack Overflow.

## Rules Are Supreme

- **Check rules before acting.** Before any action, verify it is not forbidden by any rule in `.claude/rules/`.
- **Rules override instinct.** Even if something "seems fine," if a rule says no → it's no.
- **Keep rules current.** After every session with new learnings, preferences, or corrections → update `.claude/rules/` and `.wolf/cerebrum.md` immediately. Rules that go stale are rules that get broken.

## Testing

- **Test behavior, not implementation.** No exhaustive unit tests for getters/setters or trivial logic.
- **Test use-cases and program flow** — what the user does, what the system does in response.
- **TDD when suitable.** For well-defined behavior, write the test first.

## Git Discipline

- **Commit after every small increment.** Each logical unit of work gets its own commit before moving on.
- **Never start a new task with uncommitted work.** Stash or commit first, always.
- **Never push without explicit user confirmation.** Always ask, always wait for a yes.
- Commit messages: `type: description` (feat, fix, chore, refactor, docs).

## Keeping Context Current

- After any user correction or new preference → update `.wolf/cerebrum.md` immediately.
- After any rule change → confirm the rule file reflects it.
- These files are the memory. If it's not written down, the next session won't know.

## Tooling & Stack

- **Package manager:** pnpm always. Never npm or yarn.
- **Svelte:** Runes all-in. `$state()`, `$derived()`, `$props()`, `$effect()`. No `$:`, no `export let`, no legacy options API.
- **Versions:** Research npm registry before installing. Never trust training data for version numbers.

## Code Quality

- Write clean code. If a refactor or component extraction makes sense → do it, don't wait for permission.
- Temporary tests to verify behavior are welcome — better than guessing. Remove when no longer needed.
- Check all rules before any action. Rules above all else.
