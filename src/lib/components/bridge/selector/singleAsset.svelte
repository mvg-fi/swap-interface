<script lang="ts">
  import type { Asset } from "$lib/types/asset";
  import { connected } from "$lib/stores/connect";
  import { getCachedAssetBalance } from "$lib/stores/asset";
  import IconAsset from "$lib/components/common/iconAsset.svelte";
  import Loading from "$lib/components/swap/SwapInfo/Loading.svelte";
  export let asset: Asset;
  export let selected: boolean;

  $: balance = getCachedAssetBalance(asset.mixinAssetId);
</script>

{#if asset}
  <button class="btn-ghost h-14 asset-btn-bg flex flex-row font-sans">
    {#if asset.logoURI}
      <div class="avatar px-1">
        <div class="w-10 h-10">
          <IconAsset {asset} class="h-10 w-10" />
        </div>
      </div>
      <div class="text-left pl-0 flex-1">
        <div class="truncate text-base-content">{asset.symbol}</div>
        <div class="text-xs font-weight-300 sb">{asset.mixinChainName || asset.name}</div>
      </div>
      {#if selected}
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-4 opacity-60 fill-blue-600">
            <path xmlns="http://www.w3.org/2000/svg" d="M20.6644 5.2526C21.0772 5.61952 21.1143 6.25159 20.7474 6.66437L10.0808 18.6644C9.89099 18.8779 9.61898 19 9.33334 19C9.04771 19 8.7757 18.8779 8.58593 18.6644L3.2526 12.6644C2.88568 12.2516 2.92286 11.6195 3.33565 11.2526C3.74843 10.8857 4.3805 10.9229 4.74742 11.3356L9.33334 16.4948L19.2526 5.33565C19.6195 4.92286 20.2516 4.88568 20.6644 5.2526Z"></path>
          </svg>
        </div>
      {/if}
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
