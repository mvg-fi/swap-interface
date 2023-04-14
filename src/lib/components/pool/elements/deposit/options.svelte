<script lang="ts">
  import clsx from "clsx"
  import { _ } from "svelte-i18n"
  import { depositBalanced } from "$lib/stores/pool/pools";
</script>

<!-- border rounded-2xl justify-between -->
<div class="flex items-center space-x-2.5 p-2 mx-2">
  <input class="checkbox checkbox-primary checkbox-xs !rounded-md" type="checkbox" bind:checked={$depositBalanced} />
  <span class="text-sm font-semibold"> {$_('pool.deposit_balanced')} </span>
</div>
<!-- <div class="divider  my-0 mx-3"></div> -->