<script lang="ts">
  import clsx from "clsx";
  import { _ } from "svelte-i18n";
  import { ranges } from "$lib/stores/swap/slippage";
  import { slippage } from "$lib/stores/bridge/bridge";
  import ChevronLeft from "$lib/components/common/chevronLeft.svelte";
  import { alwaysCustom, enhancePrivacy, settingOpen } from "$lib/stores/bridge/settings";
</script>

<div class="flex flex-col space-y-8">
  <!-- Top -->
  <div class="flex flex-row py-0">
    <button
      on:click={()=>settingOpen.set(false)}
      class="basis-1/3 items-center justify-start">
      <ChevronLeft 
    />
    </button>
    <div class="basis-1/3 items-center justify-center">
      <span class="font-semibold">{$_("bridge.advanced_settings")}</span>
    </div>
    <div class="basis-1/3" />
  </div>

  <!-- Slippage -->
  <div class="flex flex-col space-y-2">
    <span class="text-base font-semibold">{$_("bridge.slippage_tolerance")}</span>
    <span class="text-xs opacity-60"> {$_('bridge.slippage_tolerance_info')} </span>

    <div class="btn-group">
      {#each ranges as r}
        <button
          on:click={()=>{slippage.set(r)}}
          class={clsx("btn bg-base-100 hover:bg-base-200 border-none",
          "text-base-content hover:text-base-content")}
        >
          {r}%
        </button>
      {/each}
      <div class="ml-2">
        <input class="input rounded-lg input-bordered" placeholder={$_("bridge.enter_custom_slippage")} bind:value={$slippage} />
      </div>
    </div>
  </div>

  <!-- Custom address -->
  <div class="flex flex-col space-y-2">
    <span class="text-base font-semibold">{$_("bridge.always_use_custom_address")}</span>
    <input type="checkbox" bind:checked={$alwaysCustom} class="toggle toggle-primary toggle-lg" />
  </div>

  <!-- Privacy bridging -->
  <div class="flex flex-col space-y-2">
    <span class="text-base font-semibold">{$_("bridge.enhance_privacy")}</span>
    <span class="text-xs opacity-60"> {$_('bridge.enhance_privacy_info')} </span>
    <input type="checkbox" bind:checked={$enhancePrivacy} class="toggle toggle-primary toggle-lg" />
  </div>
</div>
