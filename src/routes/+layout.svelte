<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import { env } from '$env/dynamic/public';
	import { formatTitle } from '$lib/meta';

	const { children } = $props();

	const title = $derived(formatTitle(page.data.meta.title, env.PUBLIC_SITE_NAME));
	const canonical = $derived(`${env.PUBLIC_BASE_URL}${page.url.pathname}`);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={page.data.meta.description} />
	<link rel="canonical" href={canonical} />
	<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
	<meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
</svelte:head>

{@render children()}
