<script lang="ts">
  import clsx from "clsx";
  import { _ } from "svelte-i18n";
  import { onDestroy } from "svelte";
  import { fade } from "svelte/transition";
  import { processDialog } from "$lib/stores/bridge/process";
  import Send from "$lib/components/bridge/deposit/actions/send.svelte";

  let content: any;
  function onClickOutside(e: any) {
    if (content == e.target || content.contains(e.target)) return;
    processDialog.set(false);
  }
  function onKeyDown(e: any) {
    if (e.code === "Escape") {
      processDialog.set(false);
    }
  }
  onDestroy(() => processDialog.set(false));
</script>

<svelte:window on:keydown={onKeyDown} />
<div
  in:fade
  on:click={onClickOutside}
  on:keypress={onClickOutside}
  class={clsx("modal max-w-none sm:modal-middle text-base-content select-none", 
    $processDialog && "backdrop-blur-sm modal-open")}
>
  <div class="modal-box !max-w-[32rem] p-4 flex flex-col" bind:this={content}>
    <!-- Actions -->
    <div>
      <Send />
    </div>
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
