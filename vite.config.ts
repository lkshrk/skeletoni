import { sveltekit } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			preprocess: vitePreprocess(),
			adapter: adapter(),
			compilerOptions: { runes: true },
			csp: {
				mode: 'nonce',
				directives: {
					'default-src': ['self'],
					// SvelteKit supplies script nonces; Vite development styles need unsafe-inline.
					'style-src': ['self', 'unsafe-inline'],
					'img-src': ['self', 'data:'],
					'font-src': ['self'],
					'connect-src': ['self'],
					'object-src': ['none'],
					'frame-ancestors': ['none'],
					'base-uri': ['self'],
					'form-action': ['self'],
					'upgrade-insecure-requests': true
				}
			}
		})
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}', 'scripts/**/*.test.ts'],
		passWithNoTests: true
	}
});
