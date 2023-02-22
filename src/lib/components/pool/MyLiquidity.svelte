<script>
  import { _ } from "svelte-i18n";
  import { goto } from "$app/navigation";
  import Svg from "$lib/components/common/svg.svelte";
  import ArrowRight from "$lib/images/chevron-right.svg";
</script>

<div class="w-full card bg-base-100 h-12 rounded-xl">
  <button class="flex flex-row items-center h-full px-8 gap-x-4" on:click={()=>goto('/dashboard')}>
    <div class="w-5 [[data-theme=dark]_&]:invert">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <path xmlns="http://www.w3.org/2000/svg" d="M12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4ZM6 8C6 4.68629 8.68629 2 12 2C15.3137 2 18 4.68629 18 8C18 11.3137 15.3137 14 12 14C8.68629 14 6 11.3137 6 8ZM8 18C6.34315 18 5 19.3431 5 21C5 21.5523 4.55228 22 4 22C3.44772 22 3 21.5523 3 21C3 18.2386 5.23858 16 8 16H16C18.7614 16 21 18.2386 21 21C21 21.5523 20.5523 22 20 22C19.4477 22 19 21.5523 19 21C19 19.3431 17.6569 18 16 18H8Z" fill="#0D0D0D"></path>
      </svg>
    </div>
    <div class="text-sm flex-1 font-semibold text-base-content text-start">
      <span> {$_('pool.myLiquidity')} </span>
    </div>
    <div class="w-4 [[data-theme=dark]_&]:invert">
      <Svg src={ArrowRight} alt="" />
    </div>
  </button>
</div>
