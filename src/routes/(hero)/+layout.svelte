<script>
  import HeroNav from "$lib/components/navbar/heroNav.svelte";
</script>

<main class="text-base-content bg-base-100">
  <header class="absolute w-full top-0 z-10">
    <HeroNav />
  </header>
  <slot />
</main>
