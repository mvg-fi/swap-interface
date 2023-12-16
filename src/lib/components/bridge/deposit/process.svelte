<script lang="ts">
  import clsx from "clsx";
  import { _ } from "svelte-i18n";
  import { onDestroy } from "svelte";
  import { fade } from "svelte/transition";
  import { mode, processDialog } from "$lib/stores/bridge/process";
  import Send from "$lib/components/bridge/deposit/actions/send.svelte";
  import View from "$lib/components/bridge/deposit/actions/view.svelte";
  import Load from "$lib/components/bridge/deposit/actions/load.svelte";

  onDestroy(() => processDialog.set(false));

  function onKeyDown(e: any) {
    if (e.code === "Escape") {
      processDialog.set(false);
    }
  }
</script>

<svelte:window on:keydown={onKeyDown} />
<div
  in:fade|global
  class={clsx(
    "modal max-w-none sm:modal-middle text-base-content select-none",
    $processDialog && "backdrop-blur-sm modal-open"
  )}
>
  <div
    class={clsx(
      "modal-box p-3 flex flex-col",
      $mode == 1 ? "!max-w-[26rem]" : "!max-w-[32rem]"
    )}
  >
    {#if $mode == 0}
      <!-- Pay with connected wallet -->
      <Send />
    {:else if $mode == 1}
      <!-- Pay by transfer to address -->
      <View />
    {:else if $mode == 2}
      <!-- Load after payment -->
      <Load />
    {/if}
  </div>
</div>

<style>
  .modal {
    --tw-bg-opacity: 0.6;
  }
  .modal-box {
    scrollbar-width: none;
  }
  .modal-box::-webkit-scrollbar {
    display: none;
  }
</style>
