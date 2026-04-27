export interface Meta {
	/** Page title — formatted as "{title} | {PUBLIC_SITE_NAME}" in the root layout. */
	title: string;
	/** Meta description — keep under 160 characters. */
	description: string;
}

export const defaultMeta: Meta = {
	title: 'skeletoni',
	description: 'The cleanest SvelteKit project setup.'
};

export function formatTitle(pageTitle: string, siteName: string): string {
	if (pageTitle === siteName) return siteName;
	return `${pageTitle} | ${siteName}`;
}
