<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import MenuIcon from '@lucide/svelte/icons/menu';

	const navLinks = [
		{ href: '/', label: 'Home' },
		{ href: '/about', label: 'About' },
		{ href: '/docs', label: 'Docs' },
	] as const;

	let sheetOpen = $state(false);

	function activeClass(href: string) {
		return page.url.pathname === href ? 'text-brand font-medium' : '';
	}
</script>

<header
	class="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b shadow-sm backdrop-blur"
>
	<div class="mx-auto flex h-14 max-w-5xl items-center px-4">
		<a href={resolve('/')} class="mr-6 flex shrink-0 items-center gap-2 font-semibold text-brand">
			🦦 skeletoni
		</a>

		<!-- Desktop nav -->
		<nav aria-label="Main" class="hidden items-center gap-1 md:flex">
			{#each navLinks as { href, label } (href)}
				<Button variant="ghost" size="sm" {href} class={activeClass(href)}>
					{label}
				</Button>
			{/each}
		</nav>

		<div class="flex-1"></div>

		<!-- Mobile nav — wrapper controls visibility, not bits-ui trigger -->
		<div class="md:hidden">
			<Sheet.Root bind:open={sheetOpen}>
				<Sheet.Trigger>
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
							<a href={resolve('/')} class="flex items-center gap-2 font-semibold text-brand"
								>🦦 skeletoni</a
							>
						</Sheet.Title>
					</Sheet.Header>
					<nav aria-label="Mobile" class="mt-4 flex flex-col gap-1">
						{#each navLinks as { href, label } (href)}
							<Button
								variant="ghost"
								class="justify-start {activeClass(href)}"
								{href}
								onclick={() => (sheetOpen = false)}
							>
								{label}
							</Button>
						{/each}
					</nav>
				</Sheet.Content>
			</Sheet.Root>
		</div>
	</div>
</header>
