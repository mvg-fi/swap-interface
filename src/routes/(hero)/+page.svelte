<script lang="ts">
	import { _ } from "svelte-i18n";
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";
	import Main from "$lib/components/hero/main.svelte";

	// onMount(() => {
	// 	goto("/swap");
	// });
</script>

<svelte:head>
	<title>{`${$_("appName")} - ${$_("appIntro")}`}</title>
	<meta name="description" content="" />
</svelte:head>

<div>
	
</div>

<style>
	.heros {
		background-color: white !important;
		background-image: none !important;
	}
</style>