<script lang="ts">
  import { _ } from "svelte-i18n";
  import { formatCompactUSD, formatPercentage } from "$lib/helpers/utils";

  const util = "45";
  const volume = "4222345";
</script>

<div>
  <div class="flex flex-row my-2 text-sm px-6">
    <div class="flex items-center mt-0.5 flex-1">
      <span class="font-semibold capitalize">
        {$_("technical.volume")}
      </span>
    </div>

    <div class="flex items-center mt-0.5">
      <span class="font-medium text-base uppercase text-inherit ">
        {formatCompactUSD(Number(volume),3)}
      </span>
    </div>
  </div>

  <div class="flex flex-row my-2 text-sm px-6">
    <div class="flex items-center mt-0.5 flex-1">
      <span class="font-semibold capitalize">
        {$_("technical.24fees")}
      </span>
    </div>

    <div class="flex items-center mt-0.5">
      <span
        class="font-medium text-base uppercase text-inherit"
      >
        {formatCompactUSD(Number(util),3)}
      </span>
    </div>
  </div>
</div>
