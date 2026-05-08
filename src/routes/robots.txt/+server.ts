import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/public';

export const GET: RequestHandler = () => {
	// Block crawlers on non-production deployments (staging, preview, local).
	// Uses HTTPS heuristic — if your staging also uses HTTPS, set PUBLIC_BASE_URL
	// to an http:// URL or add a dedicated PUBLIC_ENVIRONMENT env var.
	const isProduction = env.PUBLIC_BASE_URL.startsWith('https://');

	const content = isProduction
		? `User-agent: *\nAllow: /\n\nSitemap: ${env.PUBLIC_BASE_URL}/sitemap.xml\n`
		: 'User-agent: *\nDisallow: /\n';

	return new Response(content, { headers: { 'Content-Type': 'text/plain' } });
};
