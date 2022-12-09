<script lang="ts">
  import { _ } from "svelte-i18n";
  import Dashboard from "$lib/components/dashboard/board.svelte";
</script>

<svelte:head>
  <title>{`${$_("navbar.dashboard")} | ${$_("appName")}`}</title>
  <meta name="description" content="" />
</svelte:head>

<Dashboard />