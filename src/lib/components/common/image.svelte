<script>
  import { onMount } from "svelte";
  import Skeleton from "./skeleton.svelte";
  /**
   * @type {string}
   */
  export let src;
  /**
   * @type {string}
   */
  export let alt;

  let loaded = false;
  let loading = false;

  onMount(() => {
    const img = new Image();
    img.src = src;
    loading = true;

    img.onload = () => {
      loading = false;
      loaded = true;
    };
  });
</script>

{#if loaded}
  <img {src} {alt} />
{:else if loading}
  <div class="avatar mask mask-circle">
    <Skeleton />
  </div>
{/if}
