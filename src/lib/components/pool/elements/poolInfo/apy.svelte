<script>
  import { _ } from "svelte-i18n";
  import { formatPercentage, getToday } from "$lib/helpers/utils";

  const apy_daily = 0.64;
  const apy_weekly = 2.32;
</script>

<div class="flex flex-col mt-5">
  <span class="font-bold text-xl px-6"> {$_('add_liquidity.apy')} </span>

  <div class="stats shadow stats-vertical md:stats-horizontal">
    <div class="stat">
      <div class="stat-figure text-secondary">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="w-6 h-6 [[data-theme=dark]_&]:invert">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
        </svg>        
      </div>
      <div class="stat-title">{$_('add_liquidity.daily')}</div>
      <div class="stat-value">{formatPercentage(apy_daily)}</div>
      <div class="stat-desc">{getToday()}</div>
    </div>

    <div class="stat">
      <div class="stat-figure text-secondary">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="w-6 h-6 [[data-theme=dark]_&]:invert">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
        </svg>        
      </div>
      <div class="stat-title">{$_('add_liquidity.weekly')}</div>
      <div class="stat-value">{formatPercentage(apy_weekly)}</div>
      <div class="stat-desc">{`${getToday(7)}-${getToday()}`}</div>
    </div>
  </div>
</div>
