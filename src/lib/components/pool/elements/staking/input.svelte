<script lang="ts">
  import { _ } from "svelte-i18n"
  import { cleave } from "svelte-cleavejs";
  import { maskOption } from "$lib/helpers/constants";
  import { poolsLoaded, stakeMode } from "$lib/stores/pool/pools";

  $: value = 0;
</script>

<div>
  <!-- Stake -->
  {#if $stakeMode === 0}
    <div class="border border-solid rounded-2xl">
      <div class="items-center justfiy-center flex">
        <div class="flex-1 flex flex-col mx-3">
          <input
            type="tel"
            placeholder="0"
            use:cleave={maskOption}
            disabled={!$poolsLoaded}
            bind:value
            class="input border-0 p-0 w-full max-w-xs outline-none focus:outline-none on-focus font-bold text-2xl transition-none"
          />
        </div>
        <div class="mx-3">
          <span class="capitalize font-bold"> {$_('technical.lp_token')} </span>
        </div>
      </div>
    </div>

    <!-- Deposit and stake -->
  {:else if $stakeMode === 1}
    <div class="bg-base-100 w-full h-auto">
      <div>
        <!-- {#each coins as coin, i}
        <div
          class="flex flex-row items-center justify-start px-3 h-10 gap-1 hover:bg-base-200
          border-x border-base-300 border-t-0 last:border-b-2 last:rounded-b-2xl"
        >
          <div class="avatar w-6 mb-0.5">
            <div class="rounded-full">
              <Image src={icons[i]} alt="" />
            </div>
          </div>
          <span class="text-sm font-semibold ml-2 flex-1"> {coin} </span>
          {#if $exceptedWLoading}
            <Loading /> 
          {:else}
            <span> {$receiveWAmounts[i] || 0} </span>
          {/if}
        </div>
      {/each} -->
      </div>
    </div>
  {:else if $stakeMode === 2}
    <div class="border border-solid rounded-2xl">
      <div class="items-center justfiy-center flex">
        <div class="flex-1 flex flex-col mx-3">
          <input
            type="tel"
            placeholder="0"
            use:cleave={maskOption}
            disabled={!$poolsLoaded}
            bind:value
            class="input border-0 p-0 w-full max-w-xs outline-none focus:outline-none on-focus font-bold text-2xl transition-none"
          />
        </div>
        <div class="mx-3">
          <span class="capitalize font-bold"> {$_('technical.lp_token')} </span>
        </div>
      </div>
    </div>
  {/if}
</div>
