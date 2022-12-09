<script lang="ts">
	import { goto } from "$app/navigation";
	import { updateAssets } from "$lib/stores/asset";
	import { onMount } from "svelte";

	onMount(() => {
		goto("/swap");
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="" />
</svelte:head>

<style>
</style>
