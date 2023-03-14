<script lang="ts">
  import clsx from "clsx"
  import { onDestroy } from "svelte";
  import Top from "$lib/components/bridge/top.svelte";
  import Info from "$lib/components/bridge/info.svelte";
  import Input from "$lib/components/bridge/input.svelte";
  import Arrow from "$lib/components/bridge/arrow.svelte";
  import Button from "$lib/components/bridge/button.svelte";
  import { settingOpen } from "$lib/stores/bridge/settings";
  import Settings from "$lib/components/bridge/settings.svelte";
  import Recipient from "$lib/components/bridge/recipient.svelte";
  import Process from "$lib/components/bridge/deposit/process.svelte";
  import SelectAssetDialog from "$lib/components/bridge/selectAsset.svelte";
  import { toEvmCompatible, forceRecipient } from "$lib/stores/bridge/bridge";

  onDestroy(()=>settingOpen.set(false))
</script>

<div class={clsx("card bg-base-100 shadow-xl p-5 max-w-[480px] w-[480px]", $settingOpen && "h-[548px]")}>
  {#if $settingOpen}
    <div>
      <Settings />
    </div>
  {:else}
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

    {#if !$toEvmCompatible || $forceRecipient}
      <div class="py-3">
        <Recipient />
      </div>
    {/if}

    <div class="py-3">
      <Info />
    </div>

    <div class="py-2">
      <Button />
    </div>
  {/if}
</div>

<SelectAssetDialog />
<Process />
