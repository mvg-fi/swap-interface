<script lang="ts">
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";

	onMount(() => {
		goto("/swap");
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="" />
</svelte:head>
