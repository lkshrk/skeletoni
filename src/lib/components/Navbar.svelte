<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import MenuIcon from '@lucide/svelte/icons/menu';

	const navLinks = [{ href: '/', label: 'Home' }] as const;
</script>

<header
	class="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur"
>
	<div class="mx-auto flex h-14 max-w-5xl items-center px-4">
		<a href={resolve('/')} class="mr-6 flex shrink-0 items-center gap-2 font-semibold">
			🦦 skeletoni
		</a>

		<!-- Desktop nav -->
		<nav class="hidden items-center gap-1 md:flex">
			{#each navLinks as { href, label } (href)}
				<Button variant="ghost" size="sm" {href} class={page.url.pathname === href ? 'bg-muted' : ''}>
					{label}
				</Button>
			{/each}
		</nav>

		<div class="flex-1"></div>

		<!-- Mobile nav via Sheet -->
		<Sheet.Root>
			<Sheet.Trigger class="md:hidden">
				{#snippet child({ props })}
					<Button variant="ghost" size="icon" {...props}>
						<MenuIcon class="size-5" />
						<span class="sr-only">Toggle menu</span>
					</Button>
				{/snippet}
			</Sheet.Trigger>
			<Sheet.Content side="left">
				<Sheet.Header>
					<Sheet.Title>
						<a href={resolve('/')} class="flex items-center gap-2 font-semibold">🦦 skeletoni</a>
					</Sheet.Title>
				</Sheet.Header>
				<nav class="mt-4 flex flex-col gap-1">
					{#each navLinks as { href, label } (href)}
						<Button
							variant="ghost"
							class="justify-start {page.url.pathname === href ? 'bg-muted' : ''}"
							{href}
						>
							{label}
						</Button>
					{/each}
				</nav>
			</Sheet.Content>
		</Sheet.Root>
	</div>
</header>
