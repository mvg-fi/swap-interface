<script lang="ts">
  export let logos: Array<string>;
</script>

{#each logos as uri}
  <div class="grid grid-cols-4">
    <img src={uri} alt="Token icon" />
  </div>
{/each}
