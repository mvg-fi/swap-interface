<script>
  import Input from "$lib/components/bridge/input.svelte";
  import Top from "$lib/components/bridge/top.svelte";
  import Arrow from "$lib/components/bridge/arrow.svelte";
  import Info from "$lib/components/bridge/info.svelte";
  import Recipient from "$lib/components/bridge/recipient.svelte";
  import Button from "$lib/components/bridge/button.svelte";
  import SelectAssetDialog from "$lib/components/bridge/selectAsset.svelte";
  import Process from "./deposit/process.svelte";
</script>

<div class="card bg-base-100 shadow-xl p-5 max-w-[480px]">
  <div class="flex pb-3 px-1">
    <Top />
  </div>
  <div class="py-3">
    <Input from={true} />
  </div>
  <div class="flex justify-center">
    <Arrow />
  </div>
  <div class="py-3">
    <Input from={false} />
  </div>

  <div class="py-3">
    <Recipient />
  </div>

  <div class="py-3">
    <Info />
  </div>

  <div class="py-2">
    <Button />
  </div>
</div>

<SelectAssetDialog />
<Process />
