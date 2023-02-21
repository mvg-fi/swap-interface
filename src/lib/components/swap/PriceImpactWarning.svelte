<script lang="ts">
  import { _ } from "svelte-i18n";
  import { priceImpact } from "$lib/stores/swap/swap";
  import { PRICE_IMPACT_WARNING_LINE } from "$lib/helpers/constants";
</script>

{#if $priceImpact > PRICE_IMPACT_WARNING_LINE}
  <div class="alert border border-red-200 bg-base-100 p-3 my-1 items-center flex tooltip" data-tip={$_('swap.price_impact_warning_info')}>
    <div class="flex-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="stroke-red-400 flex-shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        ><path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        /></svg
      >
      <span class="text-red-400 text-base font-semibold"
        >{$_("swap.price_impact_warning")}</span
      >
    </div>
    <div class="pr-1 text-red-400 text-sm font-semibold">
      <span> -{$priceImpact}% </span>
    </div>
  </div>
{/if}
