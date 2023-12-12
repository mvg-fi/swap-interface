<script lang="ts">
  import { page } from "$app/stores";
  import Loading from "../loading.svelte";
  import { assets} from "$lib/stores/asset";
  import type { Asset } from "$lib/types/asset";
  import Navbar from "$lib/components/navbar/navbar.svelte";

  import "../../app.postcss";
  import "../styles.css";
  import { initi18n } from "../../i18n/i18n";
  import BottomNav from "$lib/components/footer/bottomNav.svelte";

  let a: Asset[] | undefined = $page.data.assets;
  a?.length && !$assets.length && assets.set(a);
  $: a?.length && !$assets.length && assets.set(a);

  const setupFn = async () => {
    await initi18n();
  };
  const setup = setupFn();
</script>

{#await setup}
  <Loading />
{:then}
  <div class="text-base-content">
    <header class="sticky top-0 z-10 backdrop-blur-sm">
      <Navbar />
    </header>

    <main class="!px-2">
      <slot />
    </main>

    <footer>
      <BottomNav />
    </footer>
  </div>
{/await}

<style>
  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    width: 100%;
    max-width: 64rem;
    margin: 0 auto;
    box-sizing: border-box;
  }

  footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 12px;
  }

  @media (min-width: 480px) {
    footer {
      padding: 12px 0;
    }
  }
</style>
