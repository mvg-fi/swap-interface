<script lang="ts">
  import clsx from "clsx";
  import { _ } from "svelte-i18n";
  import { onDestroy } from "svelte";
  import Close from "$lib/images/close.svg";
  import { slippage, setSlippage } from "$lib/stores/swap/swap";
  import { ranges, slippageDialog } from "$lib/stores/swap/slippage";

  let slipValue: number;
  $: valid = slipValue >= 0 && slipValue <= 50;
  const unsub = slippage.subscribe((value) => (slipValue = value));
  onDestroy(unsub);
</script>

<dialog
  class="modal modal-bottom sm:modal-middle"
  class:modal-open={$slippageDialog}
>
  <div class="modal-box">
    <div class="flex mb-4">
      <h3 class="font-bold text-lg text-base-content flex-1 content-center">
        {$_("slippage.setting")}
      </h3>
      <button
        class="flex-0 btn btn-xs btn-circle btn-ghost"
        on:click={() => slippageDialog.set(false)}
      >
        <img src={Close} alt="x" class="[[data-theme=dark]_&]:invert" />
      </button>
    </div>

    <div class="mb-3">
      <div class="my-5 join grid grid-cols-4 [[data-theme=dark]_&]:invert">
        {#each ranges as r}
          <button
            class={clsx(
              "btn join-item btn-sm border-none text-base-content hover:text-base-content bg-color hover:bg-base-200 font-medium text-xs",
              slipValue === r &&
                "!bg-black/10 text-base-100 hover:text-base-100",
            )}
            on:click={() => setSlippage(r)}>{r}%</button
          >
        {/each}
        <button
          class={clsx(
            "btn join-item btn-sm border-none text-base-content hover:text-base-content bg-color hover:bg-base-200 font-medium text-xs",
            !ranges.includes(slipValue) &&
              "bg-black/10 text-base-100 hover:text-base-100",
          )}
          on:click={() => setSlippage(0)}>{$_("slippage.custom")}</button
        >
      </div>

      <div class="form-control">
        <div class="join [[data-theme=dark]_&]:invert">
          <input
            type="text"
            placeholder={$_("swap.type_here")}
            bind:value={$slippage}
            class="input join-item input-bordered w-full bg-color focus:outline-0 border-none"
          />
          <button
            class="btn join-item border-none shadow-none text-base-content bg-color"
          >
            %
          </button>
        </div>
      </div>
    </div>

    <div class="w-full flex justify-center content-center pt-5">
      <button
        class="btn rounded-3xl {valid ? 'bg-black/10' : 'btn-disabled'}"
        on:click={() => slippageDialog.set(false)}>{$_("slippage.save")}</button
      >
    </div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button on:click={()=> slippageDialog.set(false)}></button>
  </form>
</dialog>

<style>
  .bg-color {
    background-color: #f5f5f5;
  }
</style>
