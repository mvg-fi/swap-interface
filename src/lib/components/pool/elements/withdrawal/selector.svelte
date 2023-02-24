<script lang="ts">
  import { _ } from "svelte-i18n"
  import { cleave } from "svelte-cleavejs";
  import { maskOption } from "$lib/helpers/constants";
  import { currentPool } from "$lib/stores/pool/pools";
  import _tokenList from "$lib/constants/tokenlist.json";
  import Image from "$lib/components/common/image.svelte";
  import { findAssetsFromTokenList } from "$lib/helpers/utils";

  const ranges = [$_('technical.single'), $_('technical.balanced'), $_('technical.custom')];
  const tooltips = [
    $_('technical.withdraw_single'),
    $_('technical.withdraw_balanced'),
    $_('technical.withdraw_custom'),
  ];
  let focus = -1;
  let m1focus = 0;
  $: assets = findAssetsFromTokenList(Object.values(_tokenList), $currentPool.underlyingCoinAddresses)
  $: icons = assets.map((e)=>{
    return e?.logoURI || ''
  });
  $: coins = assets.map((e)=>{
    return e?.symbol || ''
  });
  let avgAmounts = [1.53, 1.43];
  let customAmounts = [null,null,null,null];
</script>

<div class="m-1 my-3">
  <div class="">
    <!-- Selector -->
    <div class="btn-group grid grid-cols-3 font-medium">
      {#each ranges as _, i}
        <button
          class="btn btn-sm bg-base-100 hover:bg-base-200
          border border-base-300 hover:border-base-300
          font-medium text-xs text-base-content tooltip m-0
          first:border-r-0 last:border-l-0
          {focus != -1 ? (i === 0 ? 'bl' : i === 2 ? 'br' : '') : ''}
          {focus === i
            ? 'bg-base-300 border-base-200 hover:bg-base-200 hover:border-bsae-100'
            : ''}"
          data-tip={tooltips[i]}
          on:click={() => {
            focus = i;
          }}
        > 
          <span>{ranges[i]}</span>
        </button>
      {/each}
    </div>

    <!-- Input -->
    {#if focus === 0}
      <div class="bg-base-100 w-full h-auto">
        <div class="grid grid-cols-{coins.length}">
          {#each coins as coin, i}
            <button
              class="flex flex-row items-center justify-center h-16 gap-1 hover:bg-base-200
              border border-base-200 hover:border-x border-x-0 border-t-0 hover:border-base-300
              first:rounded-bl-2xl first:border-l last:rounded-br-2xl last:border-r
              {m1focus === i ? 'bg-base-200 border-base-200 hover:bg-base-200' : ''}"
              on:click={() => {
                m1focus = i;
              }}
            >
              <div class="avatar w-6 mb-0.5">
                <div class="rounded-full">
                  <Image src={icons[i]} alt="" />
                </div>
              </div>
              <span class="text-sm font-semibold"> {coin} </span>
            </button>
          {/each}
        </div>
      </div>
    {:else if focus === 1}
      <div class="bg-base-100 w-full h-auto">
        <div>
          {#each coins as coin, i}
            <div
              class="flex flex-row items-center justify-start px-3 h-10 gap-1 hover:bg-base-200
              border-x border-base-300 border-t-0 last:border-b-2 last:rounded-b-2xl"
            >
              <div class="avatar w-6 mb-0.5">
                <div class="rounded-full">
                  <Image src={icons[i]} alt="" />
                </div>
              </div>
              <span class="text-sm font-semibold ml-1 flex-1"> {coin} </span>
              <span> {avgAmounts[i]} </span>
            </div>
          {/each}
        </div>
      </div>
    {:else if focus === 2}
      <div class="bg-base-100 w-full h-auto">
        <div>
          {#each coins as coin, i}
            <div
              class="flex flex-row items-center justify-start px-3 h-14 gap-1
              border-x border-base-300 border-t-0 last:border-b-2 last:rounded-b-2xl"
            >
              <div class="avatar w-6 mb-0.5">
                <div class="rounded-full">
                  <Image src={icons[i]} alt="" />
                </div>
              </div>
              <span class="text-sm font-semibold ml-1 flex-1"> {coin} </span>
              <input class="input input-sm bg-base-200 transition-none" use:cleave={maskOption} bind:value={customAmounts[i]} />
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  .bl {
    border-bottom-left-radius: 0 !important;
  }
  .br {
    border-bottom-right-radius: 0 !important;
  }
  .no-margin {
    margin: 0 !important;
  }
  .bd {
    border-width: 1.25px;
  }
</style>
