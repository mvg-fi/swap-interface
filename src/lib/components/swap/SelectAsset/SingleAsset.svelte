<script lang="ts">
  import { connected } from "$lib/stores/connect";
  import { getCachedAssetBalance } from "$lib/stores/asset";
  import type { Asset } from "$lib/types/asset";
  import IconAsset from "$lib/components/common/iconAsset.svelte";
  import Loading from "$lib/components/swap/SwapInfo/Loading.svelte";
  export let asset: Asset;
  export let selected: boolean;

  $: balance = getCachedAssetBalance(asset.mixinAssetId);
</script>

{#if asset}
  <div class="h-14 asset-btn-bg flex flex-row items-center justify-center">
    {#if asset.logoURI}
      <div class="avatar px-4">
        <div class="w-9 h-9">
          <IconAsset {asset} class="w-9 h-9" />
        </div>
      </div>
      <div class="text-left pl-0 flex-1">
        <div class="truncate text-base-content capitalize">{asset.name}</div>
        <div class="text-xs font-weight-300 text-base-content/50 mt-0.5 capitalize">{asset.symbol}</div>
      </div>
      {#if $connected && $balance != null}
        <div class="text-base pr-1 truncate">
          {$balance}
        </div>
      {:else if $connected && $balance == null}
        <Loading />
      {/if}
    {/if}
  </div>
{/if}

<style>
  .asset-btn-bg:hover {
    background-color: rgba(153, 161, 189, 0.08);
  }
  .sb {
    color: rgb(152, 161, 192);
  }
</style>
