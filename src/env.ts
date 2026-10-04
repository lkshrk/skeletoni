import { defineEnvVars } from '@sveltejs/kit/env';
import { defaultMeta } from '#lib/meta.js';

export const variables = defineEnvVars({
	PUBLIC_BASE_URL: { public: true, schema: (value) => value ?? 'http://localhost:5173' },
	PUBLIC_SITE_NAME: { public: true, schema: (value) => value ?? defaultMeta.title }
});
