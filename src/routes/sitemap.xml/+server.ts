import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/public';

const routes = ['/', '/about', '/docs'] as const;

function escapeXml(str: string): string {
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

export const GET: RequestHandler = () => {
	const baseUrl = escapeXml(env.PUBLIC_BASE_URL);
	const today = new Date().toISOString().slice(0, 10);

	const urls = routes
		.map(
			(route) => `
	<url>
		<loc>${baseUrl}${route}</loc>
		<lastmod>${today}</lastmod>
	</url>`
		)
		.join('');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`;

	return new Response(xml, {
		headers: { 'Content-Type': 'application/xml' }
	});
};
