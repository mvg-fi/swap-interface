<script lang="ts">
  import Image from "$lib/components/common/image.svelte";
  import {
    selectedFromAsset,
    selectedToAsset,
    setFromAsset,
    setToAsset,
  } from "$lib/stores/swap/swap";
  export let asset: object;
  export let from: boolean;
  export let id: string;

  const setAsset = (asset: object) => {
    if (from) setFromAsset(asset);
    else setToAsset(asset);
  };
</script>

{#if asset}
  <label
    for={id}
    class="btn-ghost h-14 asset-btn-bg"
    on:click={() => setAsset(asset)}
    on:keydown={() => setAsset(asset)}
  >
    {#if asset.icon_url}
      <div class="avatar pr-1 pl-1">
        <div class="mask mask-squircle w-10 h-10">
          <Image src={asset.icon_url} alt="logo" height="40px" width="40px"/>
        </div>
      </div>
      <div class="text-left pl-0">
        <div class="font-bold">{asset.name}</div>
        <div class="text-sm opacity-50">{asset.symbol}</div>
      </div>
    {/if}
  </label>
{/if}

<style>
  .asset-btn-bg:hover {
    background-color: rgba(153, 161, 189, 0.08);
  }
</style>
