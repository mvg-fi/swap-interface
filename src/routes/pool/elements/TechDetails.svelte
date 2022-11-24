<script lang="ts">
  import { _ } from "svelte-i18n";

  import Contract from "./techDetails/contract.svelte";
  import ArrowDown from "$lib/images/chevron-down.svg";
  import ArrowUp from "$lib/images/chevron-up.svg";
  import Details from "./techDetails/details.svelte";

  let widget = true;
  const switchWidget = () => {
    widget = !widget;
  };
</script>

<div class="">
  <div
    class="font-bold text-xl py-4 px-6 flex cursor-pointer"
    on:click={() => switchWidget()}
    on:keypress={() => switchWidget()}
  >
    <span class="flex-1">{$_("add_liquidity.technical")}</span>
    <button>
      {#if widget}
        <img src={ArrowUp} alt="" class="w-5" />
      {:else}
        <img src={ArrowDown} alt="" class="w-5" />
      {/if}
    </button>
  </div>
  {#if widget}
    <div class="px-0 h-96">
      <div>
        <Contract />
      </div>
      <div class="px-6">
        <Details />
      </div>
    </div>
  {/if}
</div>
