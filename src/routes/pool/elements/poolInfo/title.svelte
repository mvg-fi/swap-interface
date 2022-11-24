<script lang="ts">
  export let name: string = "4pool";
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div tabindex="0" class="collapse rounded-box text-center w-32">
  <span class="font-bold text-2xl text-white capitalize mt-0.5">
    {name}
  </span>
  <div class="collapse-content">
    <div class="mt-3">
      <span class="rocket select-none"> 🚀 </span>
    </div>
  </div>
</div>