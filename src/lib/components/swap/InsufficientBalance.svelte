<script lang="ts">
  import clsx from "clsx";
  import { _ } from "svelte-i18n";
</script>

<button
  class={clsx(
    "w-full btn btn-lg rounded-2xl text-neutral-content border-none", 
    "btn-disabled",
  )}
>
  {$_("swap.insufficient_balance")}
</button>