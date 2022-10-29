<script>
  import SwapInput from "./SwapInput.svelte";
  import Connect from "./Connect.svelte";
  import Top from "./Top.svelte";
  import Sort from "./Sort.svelte";
</script>

<div class="card  bg-base-100 shadow-xl p-3">
  <div class="py-2 px-3 flex">
    <Top />
  </div>

  <div class="w-full my-3">
    <SwapInput from={true} />
  </div>

  <div class="w-full flex justify-center content-center">
    <Sort/>
  </div>

  <div class="w-full my-3">
    <SwapInput from={false} />
  </div>

  <div class="w-full pt-3">
    <Connect />
  </div>
</div>

<style>
</style>
