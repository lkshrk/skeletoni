<script lang="ts">
	import { resolve } from '$app/paths';
	import { Separator } from '$lib/components/ui/separator/index.js';

	const year = new Date().getFullYear();
</script>

<footer class="w-full">
	<Separator />
	<div
		class="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-muted-foreground sm:flex-row"
	>
		<p>© {year} skeletoni. All rights reserved.</p>
		<nav aria-label="Footer" class="flex gap-4">
			<a href={resolve('/')} class="transition-colors hover:text-foreground">Home</a>
			<a href={resolve('/about')} class="transition-colors hover:text-foreground">About</a>
			<a href={resolve('/docs')} class="transition-colors hover:text-foreground">Docs</a>
		</nav>
	</div>
</footer>
