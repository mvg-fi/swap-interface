<script lang="ts">
    import Skeleton from "../common/skeleton.svelte";

  export let logos: Array<string>;
</script>

{#each logos as uri}
  <div class="avatar rounded-full w-10">
    <img src={uri} alt="Token icon" />
    <!-- <Skeleton height=30 width=40 /> -->
  </div>
{/each}

<style>
  .avatar{
    --tw-border-opacity: 0 !important;
  }
</style>