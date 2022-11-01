<script lang="ts">
  import Navbar from "$lib/components/navbar/navbar.svelte";
  import Container from "$lib/components/toast/container.svelte";
  import { setLocale } from '$i18n/i18n-svelte';
  import "../app.postcss";
  import "./styles.css";

  setLocale('zh');
</script>

<div class="app">
  <header>
    <Navbar />
  </header>

  <main>
    <slot />
  </main>

  <footer>
    
  </footer>
</div>

<Container />

<style>
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

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
