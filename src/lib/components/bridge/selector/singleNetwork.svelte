<script lang="ts">
  import clsx from "clsx";
  import type { Asset } from "$lib/types/asset";
  import Image from "$lib/components/common/image.svelte";
  import { selectedNetwork } from "$lib/stores/bridge/searchNetwork";

  export let network: Asset;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<button
  class={clsx(
    "btn bg-base-100 text-base-content !h-10 !min-h-0 p-1.5 pr-3",
    "border border-zinc-300 hover:bg-base-100 hover:border-gray-400 rounded-2xl",
    $selectedNetwork===network && "bg-sky-200 border-blue-600 text-blue-600 hover:bg-sky-100 hover:border-blue-700"
  )}
  on:click={() => {
    if ($selectedNetwork != network) {
      selectedNetwork.set(network)
    } else {
      selectedNetwork.set(null)
    }
  }}
>
  <div class="w-6 mr-2">
    <Image src={network.logoURI} alt="" />
  </div>
  <div>
    <span class="font-medium"> {network.name} </span>
  </div>
</button>
