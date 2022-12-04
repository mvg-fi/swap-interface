<script lang="ts">
  import { fade } from "svelte/transition";
  import { _ } from "svelte-i18n";

  const util = "45";
  const volume = "42.23M";
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
        class="font-medium text-base uppercase text-inherit hover:text-indigo-500"
      >
        {util}%
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
        ${volume}
      </span>
    </div>
  </div>
</div>
