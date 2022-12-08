<script lang="ts">
  import clsx from "clsx";
  import { onMount } from "svelte";
  import Skeleton from "$lib/components/common/skeleton.svelte";

  let src: string;
  let alt: string | undefined;
  let imgClass: string | undefined = undefined;
  export { src, alt, imgClass as class };

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
<!-- TODO (!BUG in chrome) -->
{#if loaded}
  <img {src} {alt} loading="lazy" class={clsx(imgClass)}/>
{:else if loading}
  <div class="avatar mask mask-circle {clsx(imgClass)}">
    <Skeleton />
  </div>
{/if}
