<script lang="ts">
  import Image from "$lib/components/common/image.svelte";
  export let asset: object;
</script>

{#if asset}
  <button class="btn-ghost h-14 asset-btn-bg">
    {#if asset.icon_url}
      <div class="avatar pr-1 pl-1">
        <div class="mask mask-squircle w-10 h-10">
          <Image src={asset.icon_url} alt="logo" height="40px" width="40px" />
        </div>
      </div>
      <div class="text-left pl-0">
        <div class="ft truncate text-base">{asset.name}</div>
        <div class="text-xs font-weight-300 sb">{asset.symbol}</div>
      </div>
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
