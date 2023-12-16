<script lang="ts">
  import clsx from "clsx";
  import { _ } from "svelte-i18n";
  import Empty from "$lib/images/empty-token.svg";
  import {
    currentPool,
    withdrawMode,
    mode1Options,
    inputLpAmount,
    receiveWAmount,
    receiveWAmounts,
    withdrawError,
    exceptedWLoading,
    withdrawErrorMsg,
  } from "$lib/stores/pool/pools";
  import _tokenList from "$lib/constants/tokenlist.json";
  import Image from "$lib/components/common/image.svelte";
  import { findAssetsFromTokenList } from "$lib/helpers/utils";
  import Loading from "$lib/components/pool/elements/deposit/loading.svelte";

  const ranges = [
    $_("technical.single"),
    $_("technical.balanced"),
    // $_("technical.custom"),
  ];
  const tooltips = [
    $_("technical.withdraw_single"),
    $_("technical.withdraw_balanced"),
    // $_("technical.withdraw_custom"),
  ];
  $: assets = findAssetsFromTokenList(
    Object.values(_tokenList),
    $currentPool.underlyingCoinAddresses
  );
  $: icons = assets.map((e) => {
    return e?.logoURI || Empty;
  });
  $: coins = $currentPool.underlyingCoins;

  const fetchRecvAmount = async () => {
    if($withdrawMode == -1) return
    withdrawError.set(false)
    exceptedWLoading.set(true)
    receiveWAmount.set('0')
    receiveWAmounts.set([])
    if ($inputLpAmount==null||$inputLpAmount==0||$inputLpAmount==undefined){
      receiveWAmount.set('0')
      receiveWAmounts.set([])
      exceptedWLoading.set(false)
      return;
    }
    try {
      await (async () => {
        switch ($withdrawMode) {
          case 0:
            //single
            console.log('single')
            const r = await $currentPool.withdrawOneCoinExpected(
              $inputLpAmount,
              $currentPool.underlyingCoinAddresses[$mode1Options]
            )
            console.log('r:',r)
            receiveWAmount.set(r)
            break;
          case 1:
            //balanced
            console.log('balanced')
            receiveWAmounts.set(await $currentPool.withdrawExpected($inputLpAmount));
            console.log('receiveWAmounts:',$receiveWAmounts)
            break;
        }
      })()
    } catch (e) {
      withdrawError.set(true)
      withdrawErrorMsg.set(e.message)
    } finally {
      exceptedWLoading.set(false)
    }
  };
  $: $withdrawMode, $mode1Options, fetchRecvAmount()
</script>

<div class="m-1 my-3">
  <div class="">
    <!-- Selector -->
    <div class="join grid grid-cols-2 font-medium">
      {#each ranges as _, i}
        <button
          class={clsx("btn btn-sm bg-base-100 hover:bg-base-200 border border-base-300 join-item", 
            "hover:border-base-300 font-medium text-xs text-base-content tooltip m-0 first:border-r-0 last:border-l-0", 
            ($withdrawMode === 0 || $withdrawMode === 1) && i===0 && "rounded-bl-none",
            ($withdrawMode === 0 || $withdrawMode === 1) && i==ranges.length-1 && "rounded-br-none",
            $withdrawMode === i && 'bg-base-300 border-base-200 hover:bg-base-200 hover:border-base-100')
          }
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

    <!-- Buttons -->
    {#if $withdrawMode === 0}
      <div class="bg-base-100 w-full h-auto">
        <div class="">
          {#each coins as coin, i}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div
              class="flex flex-row items-center justify-start px-3 h-10 gap-1 hover:bg-base-200
              border-x border-base-300 border-t-0 last:border-b-2 last:rounded-b-2xl cursor-pointer"
              on:click={() => {
                mode1Options.set(i);
              }}
            >
              <div class="avatar w-6 mb-0.5">
                <div class="rounded-full">
                  <Image src={icons[i]} alt="" />
                </div>
              </div>
              <span class="text-sm font-semibold ml-2 flex-1"> {coin} </span>
              {#if $mode1Options == i}
                <button><svg width="28" height="24" class="stroke-grey-500" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke-width="2"></circle><circle cx="12" cy="12" r="6" class="fill-blue-400 stroke-blue-400" stroke-width="2"></circle></svg></button>
              {:else}
                <button><svg width="28" height="24" aria-hidden="true"><circle cx="12" cy="12" r="8" stroke-width="2" class="stroke-grey-500"></circle><circle cx="12" cy="12" r="6" class="fill-white stroke-white" stroke-width="2"></circle></svg></button>
              {/if}
            </div>
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
              <span class="text-sm font-semibold ml-2 flex-1"> {coin} </span>
              {#if $exceptedWLoading}
                <Loading /> 
              {:else}
                <span> {$receiveWAmounts[i] || 0} </span>
              {/if}
            </div>
          {/each}
        </div>
      </div>
    <!-- {:else if $withdrawMode === 2}
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
      </div> -->
    {/if}
  </div>
</div>

<style>
  
</style>
