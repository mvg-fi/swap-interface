<script>
  import BottomNav from "$lib/components/footer/bottomNav.svelte";
  import Navbar from "$lib/components/navbar/navbar.svelte";
  import { page } from "$app/stores";
  import SecondNav from "$lib/components/navbar/secondNav.svelte";
  let innerWidth = 0;
  $: isMd = innerWidth >= 720;
</script>

<svelte:window bind:innerWidth />
{#if !isMd && $page.url.pathname.match("/pool/[^/]+/?$")}
  <div class="text-base-content">
    <header class="sticky top-0 z-10">
      <SecondNav />
    </header>
    <main class="!px-2 mt-3 mb-24">
      <slot />
    </main>
    <footer>
      <BottomNav />
    </footer>
  </div>
{:else}
  <div class="text-base-content">
    <header class="sticky top-0 z-10 backdrop-blur-sm">
      <Navbar />
    </header>

    <main class="!px-2 mt-3 mb-24 md:mb-0">
      <slot />
    </main>

    <footer>
      <BottomNav />
    </footer>
  </div>
{/if}
