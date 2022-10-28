<script>
  import SwapInput from "./SwapInput.svelte";
  import Connect from "./Connect.svelte";
  import Setting from "./Setting.svelte";
</script>

<div class="card w-5/12 bg-base-100 shadow-xl p-4">
  <div class="py-2 px-3 flex">
    <span class="font-medium flex-1"> Swap </span>
    <Setting />
  </div>

  <div class="w-full my-3">
    <SwapInput from={true} />
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
