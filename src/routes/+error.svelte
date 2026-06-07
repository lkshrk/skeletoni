<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
</script>

<div class="flex flex-col items-center gap-4 py-24 text-center">
	<p class="text-muted-foreground text-sm font-medium uppercase tracking-widest">
		{page.status}
	</p>
	<h1 class="text-4xl font-bold tracking-tight">
		{page.error?.message ?? 'Something went wrong'}
	</h1>
	<a
		href={resolve('/')}
		class="text-brand hover:text-brand/80 text-sm underline-offset-4 hover:underline"
	>
		Go home
	</a>
</div>
