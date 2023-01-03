<script lang="ts">
  import { _ } from "svelte-i18n";
  import { processDialog } from "$lib/stores/bridge/process";
</script>

<div>
  <button
    on:click={() => processDialog.set(true)}
    class="btn rounded-3xl border-none bg-base-200 hover:bg-base-300 w-full btn-lg"
  >
    <span class="text-base-content"> {$_("bridge.bridge")} </span>
  </button>
</div>
