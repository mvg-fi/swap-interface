<script>
  import clsx from "clsx";
  import { _ } from "svelte-i18n"
  import Loading from "$lib/components/pool/elements/deposit/loading.svelte";
  import { stakeMode } from "$lib/stores/pool/pools";

  const ranges = [
    $_("technical.stake"),
    $_("pool.deposit_and_stake"),
    $_("technical.unstake"),
  ];
  const tooltips = [
    $_("technical.stake_t"),
    $_("pool.deposit_and_stake_t"),
    $_("technical.unstake_t"),
  ];
</script>

<div class="m-1 my-3">
  <div class="">
    <!-- Selector -->
    <div class="join grid grid-cols-3 font-medium">
      {#each ranges as _, i}
        <button
          class={clsx("btn btn-sm bg-base-100 hover:bg-base-200 border border-base-300 join-item", 
            "hover:border-base-300 font-medium text-xs text-base-content tooltip m-0 first:border-r-0 last:border-l-0", 
            ($stakeMode === 0 || $stakeMode === 1) && i===0 && "rounded-bl-none",
            ($stakeMode === 0 || $stakeMode === 1) && i==ranges.length-1 && "rounded-br-none",
            $stakeMode === i && 'bg-base-300 border-base-200 hover:bg-base-200 hover:border-base-100')
          }
          data-tip={tooltips[i]}
          on:click={() => {
            stakeMode.set(i);
          }}
        >
          <span>{ranges[i]}</span>
        </button>
      {/each}
    </div>

    <!-- Buttons -->
    {#if $stakeMode === 0}
      <div class="bg-base-100 w-full h-auto">
        <div class="">
          <!-- {#each coins as coin, i}
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
          {/each} -->
        </div>
      </div>
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
    <!-- {:else if $stakeMode === 2}
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