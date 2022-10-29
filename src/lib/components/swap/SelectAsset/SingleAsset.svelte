<script lang="ts">
  export let asset: object;
</script>

{#if asset}
  <button class="btn-ghost h-14">
    {#if asset.logoURI}
      <div class="avatar pr-1">
        <div class="mask mask-squircle w-10 h-10">
          <img src={asset.logoURI} alt="logo" />
        </div>
      </div>
      <div class="text-left pl-0">
        <div class="font-bold">{asset.symbol}</div>
        <div class="text-sm opacity-50">{asset.name}</div>
      </div>
    {/if}
    <div />
  </button>
{/if}