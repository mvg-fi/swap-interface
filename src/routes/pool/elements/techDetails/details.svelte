<script lang="ts">
  import { fade } from "svelte/transition";
  import { _ } from "svelte-i18n";

  const s = [$_('technical.fee'),$_('technical.admin_fee'),$_('technical.virtual_price'),$_('technical.a'),];
  const b = ["0.01%", "0.005%", "1.034521", "2000"]
</script>

<div class="grid grid-cols-2 gap-1 border rounded-2xl text-xs" in:fade out:fade>
  {#each s as _,i}
    <div class="m-2 flex">
      <span class="flex-1 font-medium"> {s[i]} </span>
      <span> {b[i]} </span>
    </div>
  {/each}
</div>
