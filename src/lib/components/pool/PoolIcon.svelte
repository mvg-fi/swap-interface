<script lang="ts">
  import type { Asset } from "$lib/types/asset";
  import IconAsset from "../common/iconAsset.svelte";
  export let assets: (Asset| undefined)[];
</script>

{#each assets as asset}
  <div class="avatar w-5 h-5 -rotate-45">
    <IconAsset {asset} chainClass="!h-[8px] !w-[8px]"/>
  </div>
{/each}

<style>
  .avatar {
    --tw-border-opacity: 0 !important;
  }
</style>
