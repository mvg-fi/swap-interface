<script lang="ts">
  import { fade } from "svelte/transition";
  import { _ } from "svelte-i18n";

  const s = [$_('technical.fee'),$_('technical.admin_fee'),$_('technical.virtual_price'),$_('technical.a'),];
  const b = ["0.01%", "0.005%", "1.034521", "2000"]
</script>

<div class="grid grid-cols-2 border rounded-2xl text-xs gp" in:fade>
  {#each s as _,i}
    <div class="flex p-3">
      <span class="flex-1 font-semibold"> {s[i]} </span>
      <span> {b[i]} </span>
    </div>
  {/each}
</div>

<style>
  .gp {
    grid-gap: 1px;
  }
</style>