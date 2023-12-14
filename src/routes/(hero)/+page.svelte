<script lang="ts">
	import { _ } from "svelte-i18n";
  import Carousels from "$lib/components/hero/carousels.svelte";
</script>

<svelte:head>
	<title>{`${$_("appName")} - ${$_("appIntro")}`}</title>
	<meta name="description" content="" />
</svelte:head>


<Carousels />

<style>
	.heros {
		background-color: white !important;
		background-image: none !important;
	}
	/* Dynamic background */
	.dbg {
		animation: GradientAnimation 2s ease infinite; 
	}
	@keyframes GradientAnimation {
		0%{background-position: 11% 0%}
		50%{background-position: 89% 100%}
		100%{background-position:11% 0%}
	}
</style>
