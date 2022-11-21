<script lang="ts">
    import Image from "$lib/components/common/image.svelte";

  export let logos: Array<string>;
</script>

{#each logos as uri}
  <div class="avatar rounded-full w-10">
    <Image src={uri} alt="img" width="28px" height="28px" />
  </div>
{/each}

<style>
  .avatar{
    --tw-border-opacity: 0 !important;
  }
</style>