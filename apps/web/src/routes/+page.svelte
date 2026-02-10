<script lang="ts">
	import * as embeds from 'sveltekit-embeds';

	const export_count = Object.keys(embeds).length;
</script>

<h1>SvelteKit Embeds Demo</h1>
<p>Workspace package import is configured.</p>
<p>Available exports: {export_count}</p>
