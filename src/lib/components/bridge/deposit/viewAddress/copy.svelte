<script lang="ts">
  import clsx from "clsx";
  import { _ } from "svelte-i18n";
  import Copy from "$lib/images/copy.svg";
  import Copied from "$lib/images/check.svg";

  let clazz = "";
  let copied = false;
  export let copyText = "";
  export { clazz as class };
</script>

<div
  class={clsx(clazz)}
>
  <button
    on:click={() => {
      copied = true;
      navigator.clipboard.writeText(copyText);
      setTimeout(() => {
        copied = false;
      }, 2000);
    }}
    data-tip={copied ? $_("tooltip.copied") : $_("tooltip.copy")}
    class="w-6 h-6 bg-base-200 hover:bg-base-300 rounded-xl items-center justify-center flex tooltip"
  >
    {#if copied}
      <img src={Copied} alt="" class="w-4" />
    {:else}
      <img src={Copy} alt="" class="w-4" />
    {/if}
  </button>
</div>
