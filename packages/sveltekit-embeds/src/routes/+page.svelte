<script lang="ts">
	import GeneralObserver from '$lib/components/general-observer.svelte';
</script>

<h1>GeneralObserver Preview</h1>
<p>Scroll down to trigger the observed embed. The first embed bypasses observation.</p>

<GeneralObserver disable_observer={true}>
	<iframe src="about:blank" title="always-loaded"></iframe>
</GeneralObserver>

<div class="spacer"></div>

<GeneralObserver threshold={0.6}>
	<iframe src="about:blank" title="observed-loaded"></iframe>
</GeneralObserver>

<style>
	iframe {
		width: 100%;
		height: 180px;
		border: 1px solid #d0d7de;
		border-radius: 8px;
	}

	.spacer {
		height: 80vh;
	}
</style>
