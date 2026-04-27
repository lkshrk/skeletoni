<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import { env } from '$env/dynamic/public';
	import { formatTitle } from '$lib/meta';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';

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
	<meta property="og:title" content={title} />
	<meta property="og:description" content={page.data.meta.description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:type" content="website" />
</svelte:head>

<div class="flex min-h-svh flex-col">
	<a
		href="#main-content"
		class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-brand focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-brand-foreground focus:outline-none"
	>
		Skip to content
	</a>
	<Navbar />
	<main id="main-content" class="flex-1">
		<div class="mx-auto max-w-5xl px-4 py-8">
			{@render children()}
		</div>
	</main>
	<Footer />
</div>
