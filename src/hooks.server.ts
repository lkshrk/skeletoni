import type { Handle } from '@sveltejs/kit';

// CSP (including nonce injection for SvelteKit's inline scripts) is configured
// in svelte.config.js → kit.csp. This hook handles the remaining headers.
// HSTS is intentionally omitted — set it in your reverse proxy (nginx/Caddy/Cloudflare):
// Strict-Transport-Security: max-age=31536000; includeSubDomains
export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);

	response.headers.set('X-Frame-Options', 'DENY');
	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
	response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

	return response;
};
