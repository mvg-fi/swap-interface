<script lang="ts">
  import { _ } from "svelte-i18n";
  import { mode } from "$lib/stores/bridge/process";
  import loadingHuge from "$lib/images/loading-huge.svg";
</script>

<div
    class="loading-deposit flex flex-col justify-center items-center w-full h-full"
  >
    <img
      src={loadingHuge}
      alt=""
      class="w-full h-40 [[data-theme=dark]_&]:invert"
    />
    <div class="text-center">
      <span class="font-normal text-xl text-base-content tracking-wide">
        {$_("bridge.loading_deposit")}
      </span>
    </div>
    <div class="text-center mt-2">
      <span
        class="font-normal text-sm opacity-30 text-base-content tracking-wide"
      >
        {$_("bridge.loading_deposit_text")}
      </span>
    </div>
    <div class="cancel justify-center flex p-2 mt-4 w-full">
      <button
        on:click={() => mode.set(2)}
        class="btn bg-base-200 border-2 border-base-200 hover:bg-base-300 hover:border-base-300 rounded-2xl text-opacity-80"
      >
        <span class="text-base-content"> {$_("bridge.back")} </span>
      </button>
    </div>
  </div>