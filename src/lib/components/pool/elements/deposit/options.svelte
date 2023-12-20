<script lang="ts">
  import { _ } from "svelte-i18n"
  import { depositBalanced, depositAndStake } from "$lib/stores/pool/pools";
</script>

<div class="flex items-center space-x-2.5 p-2 mx-2">
  <input class="checkbox checkbox-primary checkbox-xs !rounded-md" type="checkbox" bind:checked={$depositBalanced} />
  <span class="text-sm font-semibold"> {$_('pool.deposit_balanced')} </span>
</div>
<div class="flex items-center space-x-2.5 p-2 mx-2">
  <input class="checkbox checkbox-primary checkbox-xs !rounded-md" type="checkbox" bind:checked={$depositAndStake} />
  <span class="text-sm font-semibold"> {$_('pool.deposit_and_stake_t')} </span>
</div>