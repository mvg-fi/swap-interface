<script>
  import BottomNav from "$lib/components/footer/bottomNav.svelte";
  import Navbar from "$lib/components/navbar/navbar.svelte";

</script>

<div class="text-base-content">
  <header class="sticky top-0 z-10 backdrop-blur-sm">
    <Navbar />
  </header>

  <main class="!px-2 mt-3 mb-24">
    <slot />
  </main>

  <footer>
    <BottomNav />
  </footer>
</div>
