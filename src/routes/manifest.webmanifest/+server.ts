import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/public';

export const GET: RequestHandler = () => {
	const siteName = env.PUBLIC_SITE_NAME;

	return new Response(
		JSON.stringify(
			{
				name: siteName,
				short_name: siteName,
				start_url: '/',
				display: 'standalone',
				background_color: '#ffffff',
				theme_color: '#ffffff',
				icons: [
					{
						src: '/favicon.svg',
						sizes: 'any',
						type: 'image/svg+xml',
						purpose: 'any'
					}
				]
			},
			null,
			'\t'
		),
		{ headers: { 'Content-Type': 'application/manifest+json' } }
	);
};
