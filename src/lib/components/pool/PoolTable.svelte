<script lang="ts">
  import { _ } from "svelte-i18n";
  import { pools } from "$lib/constants/pools";
  import { sortPools } from "$lib/helpers/utils";
  import caretUp from "$lib/images/caret-up.svg";
  import { search } from "$lib/stores/searchPool";
  import caretDown from "$lib/images/caret-down.svg";
  import SinglePool from "$lib/components/pool/SinglePool.svelte";
  import NoResult from "$lib/components/swap/SelectAsset/NoResult.svelte";
  
  // let timeout: any = null;
  // const delayOutput = () => {
  //   clearTimeout(timeout);
  //   timeout = setTimeout(function () {}, 1000);
  // };
  $: visiablePools =
    $search == ""
      ? Object.values(pools)
      : Object.values(pools).filter((pool) => {
          return (
            pool.name.match($search) ||
            pool.swap_address.match($search) ||
            pool.swap_address.match($search) ||
            pool.underlying_coins.find((element) => {
              if (element.toLowerCase().includes($search.toLowerCase()))
                return true;
            }) ||
            pool.underlying_coin_addresses.find((element) => {
              if (element.toLowerCase().includes($search.toLowerCase()))
                return true;
            })
          );
        });

  const keys = ["name", "apy", "tvl", "volume"];
  const tableHeaders = [
    $_("pooltable.name"),
    $_("pooltable.apy"),
    $_("pooltable.tvl"),
    $_("pooltable.volume"),
  ];
  let selectedField = keys[0];
  let asc = true;
  $: sortedPools = sortPools(selectedField, visiablePools, asc);
</script>

<div>
  <div class="overflow-x-auto w-full select-none">
    <table class="table w-full">
      {#if sortedPools.length != 0}
        <thead>
          <tr>
            {#each tableHeaders as th, i}
              <th
                class="cursor-pointer"
                on:click={() => {
                  selectedField = keys[i];
                }}
              >
                <div class="flex flex-row items-center text-base-content">
                  <span>{th}</span>
                  {#if keys[i] === selectedField}
                    <button class="w-5" on:click={()=>asc = !asc}>
                      {#if asc}
                        <img src={caretDown} alt="" class="[[data-theme=dark]_&]:invert"/>
                      {:else}
                        <img src={caretUp} alt="" class="[[data-theme=dark]_&]:invert"/>
                      {/if}
                    </button>
                  {/if}
                </div>
              </th>
            {/each}
          </tr>
        </thead>
        <tbody class="cursor-pointer text-base-content">
          {#each sortedPools as pool}
            <SinglePool {pool} />
          {/each}
        </tbody>
      {:else}
        <div
          class="flex grow flex-col space-y-3 py-12 h-full w-full items-center justify-center"
        >
          <NoResult />
        </div>
      {/if}
    </table>
  </div>
</div>

<style>
  .table :where(thead, tfoot) :where(th, td) {
    background-color: transparent;
    text-transform: none !important;
  }
</style>
