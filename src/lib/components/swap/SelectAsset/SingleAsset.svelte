<script lang="ts">
  import { connected } from "$lib/stores/connect";
  import { getCachedAssetBalance } from "$lib/stores/asset";
  import type { Asset } from "$lib/types/asset";
  import IconAsset from "$lib/components/common/iconAsset.svelte";
  import Loading from "$lib/components/swap/SwapInfo/Loading.svelte";
  export let asset: Asset;

  $: balance = getCachedAssetBalance(asset.mixinAssetId);
</script>

{#if asset}
  <button class="btn-ghost h-14 asset-btn-bg flex flex-row">
    {#if asset.logoURI}
      <div class="avatar px-1">
        <div class="w-10 h-10">
          <IconAsset {asset} class="h-10 w-10" />
        </div>
      </div>
      <div class="text-left pl-0 flex-1">
        <div class="truncate text-base-content">{asset.name}</div>
        <div class="text-xs font-weight-300 sb">{asset.symbol}</div>
      </div>
      {#if $connected && $balance != null}
        <div class="px-1 truncate">
          {$balance}
        </div>
      {:else if $connected && $balance == null}
        <Loading />
      {/if}
    {/if}
  </button>
{/if}

<style>
  .asset-btn-bg:hover {
    background-color: rgba(153, 161, 189, 0.08);
  }
  .sb {
    color: rgb(152, 161, 192);
  }
</style>
