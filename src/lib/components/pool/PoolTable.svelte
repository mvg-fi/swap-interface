<script lang="ts">
  import { _ } from "svelte-i18n";
  import { pools } from "$lib/constants/pools";
  import SinglePool from "./SinglePool.svelte";
  import { sortByNumber, sortByString } from "$lib/helpers/utils";
  import caretUp from "$lib/images/caret-up.svg";
  import { search } from "$lib/stores/searchPool";
  import caretDown from "$lib/images/caret-down.svg";
  import NoResult from "$lib/components/swap/SelectAsset/NoResult.svelte";

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
  $: sortedPools =
    selectedField === keys[0]
      ? sortByString(selectedField, visiablePools, asc)
      : sortByNumber(selectedField, visiablePools, asc);
</script>

<div class="mt-3">
  <div class="overflow-x-auto w-full select-none">
    <table class="table w-full">
      <!-- Object.values(visiablePools).length -->
      {#if sortedPools.length != 0}
        <thead>
          <tr>
            {#each tableHeaders as th, i}
              <th
                class="cursor-pointer"
                on:click={() => {
                  selectedField = keys[i];
                  asc = !asc;
                  console.log(selectedField, i);
                }}
              >
                <div class="flex flex-row items-center">
                  <span>{th}</span>
                  {#if keys[i] === selectedField}
                    <button class="w-5">
                      {#if asc}
                        <img src={caretDown} alt="" />
                      {:else}
                        <img src={caretUp} alt="" />
                      {/if}
                    </button>
                  {/if}
                </div>
              </th>
            {/each}
          </tr>
        </thead>
        <tbody class="cursor-pointer">
          {#each sortedPools as pool}
            <SinglePool {pool} />
          {/each}
        </tbody>
      {:else}
        <div
          class="flex grow flex-col space-y-3 py-6 h-full w-full items-center justify-center"
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
