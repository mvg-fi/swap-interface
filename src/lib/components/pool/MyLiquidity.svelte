<script>
  import { _ } from "svelte-i18n";
  import { goto } from "$app/navigation";
  import Vault from "$lib/images/home-money.svg";
  import Svg from "$lib/components/common/svg.svelte";
  import ArrowRight from "$lib/images/chevron-right.svg";
</script>

<div class="w-full card bg-base-100 h-12 rounded-2xl">
  <button class="flex flex-row items-center h-full px-6 gap-x-4" on:click={()=>goto('/dashboard')}>
    <div class="w-5 [[data-theme=dark]_&]:invert">
      <Svg src={Vault} alt="" />
    </div>
    <div class="text-sm flex-1 font-semibold text-base-content text-start">
      <span> {$_('pool.myLiquidity')} </span>
    </div>
    <div class="w-4 [[data-theme=dark]_&]:invert">
      <Svg src={ArrowRight} alt="" />
    </div>
  </button>
</div>
