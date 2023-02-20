<script lang="ts">
  import clsx from "clsx";
  import { _ } from "svelte-i18n";
  import { swapNotAvail } from "$lib/stores/swap/swap";

</script>

<button
  class={clsx("w-full btn btn-lg rounded-2xl text-neutral-content border-none", $swapNotAvail && "btn-disabled")}
  on:click={() => {
    
  }}
>
  {$_("swap.approve")}
</button>