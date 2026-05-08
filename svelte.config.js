import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		csp: {
			mode: 'nonce',
			directives: {
				'default-src': ["'self'"],
				// script-src intentionally omitted — SvelteKit adds 'nonce-<value>' automatically
				// when mode is 'nonce'. An explicit script-src override would remove the nonce.
				// 'unsafe-inline' required for Vite's dev-mode style injection.
				// In production, Svelte compiles all styles to external CSS files.
				'style-src': ["'self'", "'unsafe-inline'"],
				'img-src': ["'self'", 'data:'],
				'font-src': ["'self'"],
				'connect-src': ["'self'"],
				'object-src': ["'none'"],
				'frame-ancestors': ["'none'"],
				'base-uri': ["'self'"],
				'form-action': ["'self'"],
				'upgrade-insecure-requests': true
			}
		}
	},
	compilerOptions: {
		runes: true
	}
};

export default config;
