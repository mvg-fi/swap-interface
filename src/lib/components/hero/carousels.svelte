<script>
  import Main from "$lib/components/hero/main.svelte";
  import Efficient from "$lib/components/hero/efficient.svelte";
  import Ownership from "$lib/components/hero/ownership.svelte";
  import Decentralized from "$lib/components/hero/decentralized.svelte";
  import Technology from "$lib/components/hero/technology.svelte";
  import Developer from "$lib/components/hero/developer.svelte";
  import Community from "$lib/components/hero/community.svelte";
</script>

<div class="sh w-full carousel carousel-vertical">
  <div class="carousel-item h-full" id="main">
    <Main />
  </div>
  <div class="carousel-item h-full" id="efficient">
    <Efficient />
  </div>
  <div class="carousel-item h-full" id="dencentralized">
    <Decentralized />
  </div>
  <div class="carousel-item h-full" id="ownership">
    <Ownership />
  </div>
  <div class="carousel-item h-full" id="technology">
    <Technology />
  </div>
  <div class="carousel-item h-full" id="developer">
    <Developer />
  </div>
  <div class="carousel-item h-full" id="developer">
    <Community />
  </div>
</div>

<style>
  .sh {
    height: calc(100vh);
  }
</style>
