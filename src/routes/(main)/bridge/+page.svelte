<script>
  import { _ } from "svelte-i18n";
  import Bridge from "$lib/components/bridge/bridge.svelte";
</script>

<svelte:head>
  <title>{`${$_("navbar.bridge")} - ${$_("appName")}`}</title>
  <meta name="description" content="" />
</svelte:head>

<div class="flex items-center justify-center pt-8">
  <Bridge />
</div>