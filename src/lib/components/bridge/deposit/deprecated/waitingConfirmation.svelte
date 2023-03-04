<script lang="ts">
  import { _ } from "svelte-i18n";
  import loadingHuge from "$lib/images/loading-huge.svg";
</script>

<div class="flex flex-col justify-center items-center w-full h-full pb-4">
  <img src={loadingHuge} alt="" class="w-full h-40 [[data-theme=dark]_&]:invert"/>
  <div class="text-center">
    <span class="font-normal text-xl text-base-content tracking-wide"> {$_('bridge.waiting_confirmation')} </span>
  </div>
  <div class="text-center mt-2">
    <span class="font-normal text-sm opacity-30 text-base-content tracking-wide"> {$_('connect.pleaseConfirm')} </span>
  </div>
</div>