<script lang="ts">
	import { resolve } from '$app/paths';
</script>

<div class="py-16 text-center">
	<h1 class="text-4xl font-bold tracking-tight">🦦 skeletoni</h1>
	<p class="mt-3 text-muted-foreground">The cleanest SvelteKit skeleton.</p>
	<div class="mt-8 flex items-center justify-center gap-4">
		<a
			href={resolve('/docs')}
			class="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-90"
		>
			Get started
		</a>
		<a
			href={resolve('/about')}
			class="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
		>
			Learn more →
		</a>
	</div>
</div>
