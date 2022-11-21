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
  /**
   * @type {string}
   */
  export let width;
  /**
   * @type {string}
   */
  export let height;

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
  <img {src} {alt} {height} {width} />
{:else if loading}
  <Skeleton {height} {width} />
{/if}
