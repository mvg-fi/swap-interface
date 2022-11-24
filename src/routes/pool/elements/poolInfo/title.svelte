<script lang="ts">
  export let name: string = "4pool";
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div tabindex="0" class="collapse rounded-box text-center w-32">
  <span class="font-bold text-2xl text-white capitalize mt-0.5">
    {name}
  </span>
  <div class="collapse-content">
    <!-- <span class="logo font-medium mr-1"> MVG </span>
    <span> To the moon </span> -->
    <div class="mt-3">
      <span class="rocket select-none"> 🚀 </span>
    </div>
  </div>
</div>

<style>
  .logo {
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
      Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif,
      "Apple Color Emoji", "Segoe UI Emoji", Segoe UI Symbol, "Noto Color Emoji";
  }
  /* .rocket {
  } */
</style>
