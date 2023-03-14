<script lang="ts">
  import { _ } from "svelte-i18n";
  import { connected } from "$lib/stores/connect";
  import ConnectWalletBtn from "../swap/ConnectWalletBtn.svelte";
  import { mode, processDialog } from "$lib/stores/bridge/process";
  import InsufficientBalance from "../swap/InsufficientBalance.svelte";

  $: balanceEnough = true
</script>

<div>
  {#if !$connected}
    <ConnectWalletBtn />
  {:else if !balanceEnough}
    <InsufficientBalance />
  {:else}
    <button
      on:click={() => {processDialog.set(true); mode.set(0)}}
      class="btn rounded-3xl border-none bg-base-200 hover:bg-base-300 w-full btn-lg"
    >
      <span class="text-base-content"> {$_("bridge.bridge")} </span>
    </button>
  {/if}
</div>
