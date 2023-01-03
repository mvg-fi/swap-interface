<script>
  import Up from "$lib/images/chevron-up.svg";
  import Down from "$lib/images/chevron-down.svg";
  import SingleNetwork from "./singleNetwork.svelte";
  import ChainList from "$lib/constants/chainlist.json";
  import Svg from "$lib/components/common/svg.svelte";
  import { selectAssetDialog } from "$lib/stores/bridge/selectAsset";
  import { selectedNetwork } from "$lib/stores/bridge/searchNetwork";
  import { search } from "$lib/stores/bridge/searchAsset";

  let expended = false;

  $: items = expended
    ? Object.values(ChainList)
    : Object.values(ChainList).slice(0, 6);
  $: if ($selectAssetDialog) {
    search.set('');
    expended = false;
    selectedNetwork.set(null);
  }
</script>

<div class="flex flex-wrap gap-2 px-5">
  {#each items as chain}
    <SingleNetwork network={chain} />
  {/each}
</div>

<!-- Expend bar -->
<button
  class="w-full mt-2 h-4 flex justify-center items-center"
  on:click={() => (expended = !expended)}
>
  <div class="w-3 opacity-50 [[data-theme=dark]_&]:invert">
    <Svg src={expended ? Up : Down} alt="" />
  </div>
</button>
