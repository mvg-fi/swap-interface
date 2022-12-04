<script lang="ts">
  import Image from "$lib/components/common/image.svelte";
  export let logos: Array<string>;
</script>

{#each logos as uri}
  <div class="avatar w-5 h-5">
    <Image src={uri} alt="img" />
  </div>
{/each}

<style>
  .avatar{
    --tw-border-opacity: 0 !important;
  }
</style>