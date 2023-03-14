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

<div class="modal modal-bottom sm:modal-middle" class:modal-open={$slippageDialog}>
  <div class="modal-box">
    <div class="flex mb-4">
      <h3 class="font-bold text-lg text-base-content flex-1 content-center">
        {$_("slippage.setting")}
      </h3>
      <button class="flex-0 btn btn-xs btn-circle btn-ghost" on:click={()=>slippageDialog.set(false)}>
        <img src={Close} alt="x" class="[[data-theme=dark]_&]:invert"/>
      </button>
    </div>

    <div class="mb-3">
      <div class="my-5 btn-group grid grid-cols-4 [[data-theme=dark]_&]:invert">
        {#each ranges as r}
          <button
            class={clsx("btn btn-sm border-none text-base-content hover:text-base-content bg-color hover:bg-base-200 font-medium text-xs",
              slipValue === r && '!bg-black hover:bg-black text-base-100 hover:text-base-100'
            )}
            on:click={() => setSlippage(r)}>{r}%</button
          >
        {/each}
        <button
          class={clsx("btn btn-sm border-none text-base-content hover:text-base-content bg-color hover:bg-base-200 font-medium text-xs", 
            !ranges.includes(slipValue) && '!bg-black hover:bg-black text-base-100 hover:text-base-100'
          )}
          on:click={() => setSlippage(0)}>{$_("slippage.custom")}</button
        >
      </div>

      <div class="form-control">
        <div class="input-group [[data-theme=dark]_&]:invert">
          <input
            type="text"
            placeholder={$_('swap.type_here')}
            bind:value={$slippage}
            class="input input-bordered w-full bg-color focus:outline-0 border-none"
          />
          <button class="btn btn-square border-none text-base-content btn-disabled bg-color">
            %
          </button>
        </div>
      </div>
    </div>

    <div class="w-full flex justify-center content-center pt-5">
      <button
        class="btn rounded-3xl {valid ? 'bg-black' : 'btn-disabled'}" 
        on:click={()=>slippageDialog.set(false)}
        >{$_("slippage.save")}</button
      >
    </div>
  </div>
</div>

<style>
  .bg-color {
    background-color: #f5f5f5;
  }
</style>
