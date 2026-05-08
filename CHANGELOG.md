## [1.2.1](https://github.com/lkshrk/skeletoni/compare/v1.2.0...v1.2.1) (2026-05-08)


### Bug Fixes

* document all required RENOVATE_TOKEN permissions ([e2e6f82](https://github.com/lkshrk/skeletoni/commit/e2e6f8211e756363363faafa7ab0d4ab53ed122d))

# [1.2.0](https://github.com/lkshrk/skeletoni/compare/v1.1.2...v1.2.0) (2026-05-08)


### Features

* trigger Renovate on CI green and PR/dashboard checkboxes ([108d6a5](https://github.com/lkshrk/skeletoni/commit/108d6a50c6c37e565b29874a66569490e537bb90))

## [1.1.2](https://github.com/lkshrk/skeletoni/compare/v1.1.1...v1.1.2) (2026-05-08)


### Bug Fixes

* pass repo and gitAuthor via env vars instead of global config ([ac01e7f](https://github.com/lkshrk/skeletoni/commit/ac01e7f2b063446d5fcc6c55ec0e1e37675042f9))

## [1.1.1](https://github.com/lkshrk/skeletoni/compare/v1.1.0...v1.1.1) (2026-05-08)


### Bug Fixes

* add global config with repository for self-hosted Renovate ([2b1d76c](https://github.com/lkshrk/skeletoni/commit/2b1d76c055cb1435c07cf9bbc77020fef9c31863))

# [1.1.0](https://github.com/lkshrk/skeletoni/compare/v1.0.0...v1.1.0) (2026-05-08)


### Features

* add post-clone setup script for template usage ([6cd39e3](https://github.com/lkshrk/skeletoni/commit/6cd39e388a4db32b1520b2f28534a36bbb2dadaf))

# 1.0.0 (2026-05-08)


### Bug Fixes

* harden security, update deps, and resolve review findings ([c0a817c](https://github.com/lkshrk/skeletoni/commit/c0a817c4c21adebc33b5d99434d061fe8a3a3276))
* reliable burger menu visibility and close behavior ([a33dc7c](https://github.com/lkshrk/skeletoni/commit/a33dc7c1b4ed12396002dfb4011ad5da5ca34f0d))
* remove explicit pnpm version from workflows ([c9bc3d7](https://github.com/lkshrk/skeletoni/commit/c9bc3d70ecd4aaccce929146b2714ca8fffed3a1))
* rename vhs output to terminal.gif to avoid collision with preview.gif ([a63ed2f](https://github.com/lkshrk/skeletoni/commit/a63ed2fe4e094d3fd6b281caa722c5687148841d))


### Features

* add /about and /docs placeholder pages ([06b2aa2](https://github.com/lkshrk/skeletoni/commit/06b2aa231d93f184f7ca6933704021d599db279e))
* add affected-routes detection for smart visual regression ([63c3d3b](https://github.com/lkshrk/skeletoni/commit/63c3d3b8477c43520e8cccc07e465117a03ecb7c))
* add ESLint with TypeScript and Svelte support ([69bf571](https://github.com/lkshrk/skeletoni/commit/69bf5719e212f4369e35d8a85acc15f29f0ce207))
* add GitHub Actions CI workflow ([f40fe4f](https://github.com/lkshrk/skeletoni/commit/f40fe4f7474ec7077618b9f4b2d1c839ea91cfbf))
* add GitHub Actions Docker build and push to ghcr.io ([81f4593](https://github.com/lkshrk/skeletoni/commit/81f4593f1b9c5bc0561b50ada291cdf05e32d4a8))
* add GitHub Actions release workflow with semantic-release ([57636a8](https://github.com/lkshrk/skeletoni/commit/57636a8b5bf18877e953a95b1b8831f7ee50d965))
* add load-driven metadata with title, description, and canonical URL ([7272ca0](https://github.com/lkshrk/skeletoni/commit/7272ca0deda77337bb1acefce1215daa18a552f7))
* add multi-stage Dockerfile with pnpm and node:22-alpine ([2abd628](https://github.com/lkshrk/skeletoni/commit/2abd628963acbb5a6cf52f0ac59e63c2ab5ef57c))
* add otter emoji SVG favicon ([5ac6b3b](https://github.com/lkshrk/skeletoni/commit/5ac6b3bdeb839c3ea7688609d537ae282f8cad0a))
* add Playwright for functional and visual E2E testing ([f1ed14d](https://github.com/lkshrk/skeletoni/commit/f1ed14d3d3f9be11c63178a973516fdd8ad44f6a))
* add Prettier with Svelte plugin ([b1fd52a](https://github.com/lkshrk/skeletoni/commit/b1fd52a334fa381698df6f247f0475c60bd5fd59))
* add Renovate for automated dependency updates ([d2b96bc](https://github.com/lkshrk/skeletoni/commit/d2b96bce64c9f35e01cdb2275b14f3c047babf8e))
* add robots.txt server route ([49656ad](https://github.com/lkshrk/skeletoni/commit/49656ad93f04efcd90894dec77a469b6e6d30264))
* add security headers and nonce-based CSP ([8d52437](https://github.com/lkshrk/skeletoni/commit/8d524376a9a654fa2edd9627643cd5e830c53583))
* add semantic-release with changelog and git plugins ([d9bd9c3](https://github.com/lkshrk/skeletoni/commit/d9bd9c3ed361cc8ca2a6d4d28b30d491ec692003))
* add shadcn-svelte with nova/zinc design system ([9509688](https://github.com/lkshrk/skeletoni/commit/9509688d49aaeb548d165bdcd7879fb18a75af89))
* add sitemap.xml server route ([35b1c7b](https://github.com/lkshrk/skeletoni/commit/35b1c7be822064de8a5e2cea1e810c4980c019be))
* add sticky Navbar and Footer components ([80eb121](https://github.com/lkshrk/skeletoni/commit/80eb121b802648252a8ec8e7c23c17aa431355a7))
* add Tailwind CSS v4 ([57ab659](https://github.com/lkshrk/skeletoni/commit/57ab659a2e281c1d9cfe0050df777863d6bd30c3))
* add VHS workflow for terminal GIF previews ([6706d49](https://github.com/lkshrk/skeletoni/commit/6706d49839a745ee894c53f133a8bd725fe6effb))
* add Vitest for unit testing ([8fbc0d6](https://github.com/lkshrk/skeletoni/commit/8fbc0d6683b4f082cadc25d964b1da19ab19ee19))
* add web app manifest and theme-color ([0b02fcd](https://github.com/lkshrk/skeletoni/commit/0b02fcdfa239c446bc8d79fe46970738779cf5a1))
* brand color token, content container, home page content ([021db7a](https://github.com/lkshrk/skeletoni/commit/021db7a80de2fdaacea40629e1110fbe80e7e13d))
* dark mode — OS detection, localStorage persistence, no-flash ([f7da92c](https://github.com/lkshrk/skeletoni/commit/f7da92c48dbbb4c358509786477c6d4454500617))
* error page + visual snapshot baselines ([3de94bb](https://github.com/lkshrk/skeletoni/commit/3de94bbd4a9a39779d9296d85e0c96a3f3bdf171))
* initialize SvelteKit 2 with Svelte 5, TypeScript, and adapter-node ([c5e206e](https://github.com/lkshrk/skeletoni/commit/c5e206ea29e35adc23ccde6dea97f82bcc632a37))
* screenshot-to-gif generator (pnpm preview:gif) ([7ffeb5f](https://github.com/lkshrk/skeletoni/commit/7ffeb5f664a758ae754ab5d4270db15f96c59eba))
* skip-to-content link (WCAG 2.4.1) ([a9d8a75](https://github.com/lkshrk/skeletoni/commit/a9d8a7535ab0cf43e6882a0c9a2c418cf697bc48))
* theme toggle (moon/sun) + fix active nav matching ([2c4f492](https://github.com/lkshrk/skeletoni/commit/2c4f492f0f8117442e2241a657b41daabe1be523))
* theme transition + OG meta tags ([a862a48](https://github.com/lkshrk/skeletoni/commit/a862a486a59afe34158fe04516ccb95f50432fa9))
* wire Navbar and Footer into root layout ([98663cd](https://github.com/lkshrk/skeletoni/commit/98663cd07bd4c09b51f85ff678a150ab9c3e0dc9))
