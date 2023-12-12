<script>
  import HeroNav from "$lib/components/navbar/heroNav.svelte";
</script>

<div class="text-base-content">
  <header class="sticky top-0 z-10 backdrop-blur-sm">
    <HeroNav />
  </header>
  <main class="!px-2">
    <slot />
  </main>
</div>
