import { defaultMeta } from '$lib/meta';
import type { LayoutServerLoad } from './$types';

// Default meta for every route. To override on a specific page, return
// { meta: { title, description } } from that page's +page.server.ts load.
export const load: LayoutServerLoad = () => ({
	meta: defaultMeta
});
