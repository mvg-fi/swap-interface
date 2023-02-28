<script lang="ts">
  import { _ } from "svelte-i18n";
  import { cleave } from "svelte-cleavejs";
  import { maskOption } from "$lib/helpers/constants";
  import {
    currentPool,
    withdrawMode,
    mode1Options,
    inputLpAmount,
    receiveWAmount,
    receiveWAmounts,
    withdrawImbalanceAmount,
    withdrawError,
    exceptedWLoading,
  } from "$lib/stores/pool/pools";
  import _tokenList from "$lib/constants/tokenlist.json";
  import Image from "$lib/components/common/image.svelte";
  import { findAssetsFromTokenList } from "$lib/helpers/utils";

  const ranges = [
    $_("technical.single"),
    $_("technical.balanced"),
    $_("technical.custom"),
  ];
  const tooltips = [
    $_("technical.withdraw_single"),
    $_("technical.withdraw_balanced"),
    $_("technical.withdraw_custom"),
  ];
  $: assets = findAssetsFromTokenList(
    Object.values(_tokenList),
    $currentPool.underlyingCoinAddresses
  );
  $: icons = assets.map((e) => {
    return e?.logoURI || "";
  });
  $: coins = assets.map((e) => {
    return e?.symbol || "";
  });

  const fetchRecvAmount = async () => {
    if($withdrawMode == -1) return
    withdrawError.set(false)
    exceptedWLoading.set(true)
    receiveWAmount.set('')
    receiveWAmounts.set([])
    await (async () => {
      switch ($withdrawMode) {
        case 0:
          //single
          receiveWAmount.set(await $currentPool.withdrawOneCoinExpected(
            $inputLpAmount,
            coins[$mode1Options]
          ))
          break;
        case 1:
          //balanced
          receiveWAmounts.set(await $currentPool.withdrawExpected($inputLpAmount));
          break
        case 2:
          //custom
          receiveWAmount.set(await $currentPool.withdrawImbalanceExpected(
            $withdrawImbalanceAmount
          ))
          break;
      }
    })()
  };
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
          {$withdrawMode != -1 ? (i === 0 ? 'bl' : i === 2 ? 'br' : '') : ''}
          {$withdrawMode === i
            ? 'bg-base-300 border-base-200 hover:bg-base-200 hover:border-bsae-100'
            : ''}"
          data-tip={tooltips[i]}
          on:click={() => {
            withdrawMode.set(i);
            fetchRecvAmount()
          }}
        >
          <span>{ranges[i]}</span>
        </button>
      {/each}
    </div>

    <!-- Input -->
    {#if $withdrawMode === 0}
      <div class="bg-base-100 w-full h-auto">
        <div class="grid grid-cols-{coins.length}">
          {#each coins as coin, i}
            <button
              class="flex flex-row items-center justify-center h-16 gap-1 hover:bg-base-200
              border border-base-200 hover:border-x border-x-0 border-t-0 hover:border-base-300
              first:rounded-bl-2xl first:border-l last:rounded-br-2xl last:border-r
              {$mode1Options === i
                ? 'bg-base-200 border-base-200 hover:bg-base-200'
                : ''}"
              on:click={() => {
                mode1Options.set(i);
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
    {:else if $withdrawMode === 1}
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
              <span> {[i]} </span>
            </div>
          {/each}
        </div>
      </div>
    {:else if $withdrawMode === 2}
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
              <input
                use:cleave={maskOption}
                bind:value={$withdrawImbalanceAmount[i]}
                class="input input-sm bg-base-200 transition-none"
              />
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
