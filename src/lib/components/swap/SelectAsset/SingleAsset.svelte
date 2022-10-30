<script lang="ts">
  import { setFromAsset, setToAsset } from "$lib/stores/swap";
  export let asset: object;
  export let from: boolean;
  export let id: string;

  const setAsset = (asset: object) => {
    if (from) setFromAsset(asset);
    if (!from) setToAsset(asset);
  };
</script>

{#if asset}
  <label
    for={id}
    class="btn-ghost h-14 asset-btn-bg"
    on:click={setAsset(asset)}
  >
    {#if asset.icon_url}
      <div class="avatar pr-1 pl-1">
        <div class="mask mask-squircle w-10 h-10">
          <img src={asset.icon_url} alt="logo" />
        </div>
      </div>
      <div class="text-left pl-0">
        <div class="font-bold">{asset.symbol}</div>
        <div class="text-sm opacity-50">{asset.name}</div>
      </div>
    {/if}
  </label>
{/if}

<style>
  .asset-btn-bg:hover {
    background-color: rgba(153, 161, 189, 0.08);
  }
</style>
