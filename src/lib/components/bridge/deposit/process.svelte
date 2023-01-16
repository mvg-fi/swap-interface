<script lang="ts">
  import { _ } from "svelte-i18n";
  import { onDestroy } from "svelte";
  import { fade } from "svelte/transition";
  import SelectMethods from "./selectMethods.svelte";
  import { mode, processDialog } from "$lib/stores/bridge/process";
  import SwitchNetwork from "./switchNetwork.svelte";
  import ViewAddress from "./viewAddress.svelte";
  import TransactionFailed from "./transactionFailed.svelte";
  import DepositLoading from "./depositLoading.svelte";
  import TransactionConfirm from "./transactionConfirm.svelte";
    import WaitingConfirmation from "./waitingConfirmation.svelte";
    import TransactionSuccess from "./transactionSuccess.svelte";

  let content: any;
  function onClickOutside(e: any) {
    if (content == e.target || content.contains(e.target)) return;
    processDialog.set(false);
  }

  function onKeyDown(e: any) {
    if (e.keyCode === 27) {
      processDialog.set(false);
    }
  }
  onDestroy(()=>processDialog.set(false))
</script>

<svelte:window on:keydown={onKeyDown} />
<div
  in:fade
  on:click={onClickOutside}
  on:keypress={onClickOutside}
  class:modal-open={$processDialog}
  class="modal modal-bottom sm:modal-middle text-base-content select-none"
>
  <div class="modal-box !max-w-[26rem] p-4 flex flex-col" bind:this={content}>
    <div class="base">
      <!-- Actions -->
      {#if $mode === 0}
        <SelectMethods bind:this={content} />
      {:else if $mode === 1}
        <SwitchNetwork bind:this={content} />
      {:else if $mode === 2}
        <ViewAddress bind:this={content} />
      {:else if $mode === 3}
        <TransactionConfirm bind:this={content} />
      {:else if $mode === 4}
        <DepositLoading bind:this={content} />
      {:else if $mode === 5}
        <!-- SwitchToMVM -->
      {:else if $mode === 6}
        <!-- ConfirmBridging -->
      {:else if $mode === 7}
        <!-- BridgingState -->

      <!-- Common -->
      {:else if $mode === 20}
        <WaitingConfirmation />
      {:else if $mode === 21}
        <TransactionSuccess />
      {:else if $mode === 22}
        <TransactionFailed />

      <!-- Errors -->
      {:else if $mode === 100}
        <!-- DepositNotFound -->
        <TransactionFailed bind:this={content} />
      {:else if $mode === 101}
        <TransactionFailed bind:this={content} />
      {:else if $mode === 102}
        <!-- BridgingFailed -->
      {/if}
    </div>
  </div>
</div>

<style>
  .modal {
    --tw-bg-opacity: 0.6;
  }
  .modal-box {
    scrollbar-width: none;
    max-width: 28rem;
  }
  .modal-box::-webkit-scrollbar {
    display: none;
  }
  .modal-bottom {
    max-width: none;
  }
  /* .current {
    box-shadow: inset 2px 0em green;
  } */
</style>
