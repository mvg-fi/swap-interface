<script lang="ts">
  import clsx from "clsx";
  import { _ } from "svelte-i18n";
  import { connected } from "$lib/stores/connect";
  import {
    poolsLoaded,
    stakeError,
    stakeApproved,
    exceptedLoading,
    inputLpAmount,
    stakeMode,
  } from "$lib/stores/pool/pools";
  import ConnectBtn from "$lib/components/pool/elements/connectBtn.svelte";
  import LoadingBtn from "$lib/components/pool/elements/loadingPoolsBtn.svelte";
  import UnableBtn from "$lib/components/pool/elements/withdrawal/unableBtn.svelte";
  import ApproveBtn from "$lib/components/pool/elements/withdrawal/approveBtn.svelte";
  
  let stakeLoading = false;
  const stake = () => {

  }
</script>

{#if !$connected}
  <ConnectBtn />
{:else if !$poolsLoaded}
  <LoadingBtn />
{:else if $exceptedLoading || $stakeError || $inputLpAmount == null || $inputLpAmount == 0}
  <UnableBtn />
{:else if $stakeApproved}
  <button
    on:click={() => stake()}
    class={clsx(
      "btn btn-lg btn-block text-black bg-gray-200 hover:bg-gray-300 border-none rounded-2xl",
      stakeLoading && "loading",
    )}
  >
    {#if $stakeMode === 0}
      <span> {$_("technical.stake")} </span>
    {:else if $stakeMode === 1}
      <span> {$_("technical.stake")} </span>
    {:else if $stakeMode === 2}
      <span> {$_("technical.unstake")} </span>
    {/if}
  </button>
{:else}
  <ApproveBtn />
{/if}
