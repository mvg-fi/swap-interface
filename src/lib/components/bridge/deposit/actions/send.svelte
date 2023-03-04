<script lang="ts">
  import clsx from "clsx";
  import { _ } from "svelte-i18n";
  import { processDialog } from "$lib/stores/bridge/process";

  const asset = "0.0982 ETH";
  const network = "Ethereum Mainnet";
</script>

<div class="flex flex-col py-1">

  <!-- Close -->
  <div class="flex justify-end px-2">
    <button
      class="flex border-none btn btn-xs btn-circle btn-ghost"
      on:click={() => processDialog.set(false)}
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 stroke-black/60" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
    </button>
  </div>

  <!-- Send xxx from xxx -->
  <div class="flex justify-center font-sans text-lg">
    <span class="">
      {$_("bridge.send")}
    <span>
    <span class="font-bold">
      {asset}
    </span>
    <span>
      {$_("bridge.from")}
    </span>
    <span>
      {network}
    </span>
  </div>

  <div>
    
  </div>
</div>
