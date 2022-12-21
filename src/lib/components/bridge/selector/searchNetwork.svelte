<script lang="ts">
  import { _ } from "svelte-i18n";
  import Search from "$lib/images/search.svg";
  import Svg from "$lib/components/common/svg.svelte";

  let expanded = false;
</script>

<div
  class="btn bg-base-100 text-base-content !h-10 !min-h-0 p-2 pr-3
    border border-zinc-300 hover:bg-base-100 hover:border-zinc-400 rounded-2xl"
>
  <div class="w-5 mr-2 opacity-60">
    <Svg src={Search} alt="" />
  </div>
  <div>
    <span class="font-medium"> {$_('bridge.search_network')} </span>
  </div>
</div>
