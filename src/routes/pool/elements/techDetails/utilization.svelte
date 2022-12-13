<script lang="ts">
  import { fade } from "svelte/transition";
  import { _ } from "svelte-i18n";
    import { formatCompactUSD, formatPercentage } from "$lib/helpers/utils";

  const util = "45";
  const volume = "4222345";
</script>

<div in:fade>
  <div class="flex flex-row my-2 text-sm px-6">
    <div class="flex items-center mt-0.5 flex-1">
      <span class="font-semibold capitalize">
        {$_("technical.utilization")}
      </span>
    </div>

    <div class="flex items-center mt-0.5 cursor-pointer">
      <span
        class="font-medium text-base uppercase text-inherit"
      >
        {formatPercentage(Number(util))}
      </span>
    </div>
  </div>

  <div class="flex flex-row my-2 text-sm px-6">
    <div class="flex items-center mt-0.5 flex-1">
      <span class="font-semibold capitalize">
        {$_("technical.volume")}
      </span>
    </div>

    <div class="flex items-center mt-0.5 cursor-pointer">
      <span class="font-medium text-base uppercase text-inherit ">
        {formatCompactUSD(Number(volume),3)}
      </span>
    </div>
  </div>
</div>
