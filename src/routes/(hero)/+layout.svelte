<script>
  import HeroNav from "$lib/components/navbar/heroNav.svelte";
</script>

<div class="text-base-content bg-base-100">
  <header class="sticky top-0 z-10 ">
    <HeroNav />
  </header>
  <main>
    <slot />
  </main>
</div>
