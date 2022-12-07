<script lang="ts">
  import { connected } from "$lib/stores/connect";
  import Loading from "../SwapInfo/Loading.svelte";
  import { getCachedAssetBalance } from "$lib/stores/asset";
  import Image from "$lib/components/common/image.svelte";
  import type { Asset } from "$lib/types/asset";
  export let asset: Asset;

  $: balance = getCachedAssetBalance(asset.mixinAssetId)
</script>

{#if asset}
  <button class="btn-ghost h-14 asset-btn-bg flex flex-row">
    {#if asset.logoURI}
      <div class="avatar px-1">
        <div class="mask mask-squircle w-10 h-10">
          <Image src={asset.logoURI} alt="logo" />
        </div>
      </div>
      <div class="text-left pl-0 flex-1">
        <div class="truncate text-base">{asset.name}</div>
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
