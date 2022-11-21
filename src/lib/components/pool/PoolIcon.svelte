<script lang="ts">
  export let logos: Array<string>;
</script>

{#each logos as uri}
  <div class="avatar rounded-full w-10">
    <img src={uri} alt="Token icon" />
  </div>
{/each}

<style>
  .avatar{
    --tw-border-opacity: 0 !important;
  }
</style>