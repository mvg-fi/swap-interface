<script lang="ts">
	import { _ } from "svelte-i18n";
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";

	onMount(() => {
		goto("/swap");
	});
</script>

<svelte:head>
	<title>{`${$_("appName")} - ${$_('appIntro')}`}</title>
	<meta name="description" content="" />
</svelte:head>
