<script lang="ts">
  import { _ } from "svelte-i18n";
  import { pools } from "$lib/constants/pools";
  import SinglePool from "./SinglePool.svelte";
  import { search } from "$lib/stores/searchPool";
  import NoResult from "$lib/components/swap/SelectAsset/NoResult.svelte";

  $: visiablePools =
    $search == ""
      ? pools
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
</script>

<div class="mt-3">
  <div class="overflow-x-auto w-full">
    <table class="table w-full sortable searchable">
      {#if Object.values(visiablePools).length != 0}
        <thead>
          <tr>
            <th>{$_("pooltable.name")}</th>
            <th>{$_("pooltable.apy")}</th>
            <th>{$_("pooltable.tvl")}</th>
            <th>{$_("pooltable.volume")}</th>
          </tr>
        </thead>
        <tbody class="cursor-pointer">
          {#each Object.values(visiablePools) as pool}
            <SinglePool {pool} />
          {/each}
        </tbody>
      {:else}
        <div
          class="flex grow flex-col items-center justify-center space-y-3 py-6 h-full w-full items-center justify-center"
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
