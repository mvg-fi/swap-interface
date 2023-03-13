<script lang="ts">
  import clsx from "clsx"
  import { _ } from "svelte-i18n"
  import curve from "@zed-wong/mvgswap";
  import { cryptoPool, poolType, process, stablePool } from "$lib/stores/pool/factory";
    import { showToast } from "../toast/container.svelte";

  const create = async () => {
    let tx;
    switch ($poolType) {
      case 1:
        tx = await curve.factory.deployPlainPool($stablePool.name, $stablePool.symbol, $stablePool.coins, $stablePool.A, $stablePool.fee, 0, 0)
        break;
      case 2:
        tx = await curve.cryptoFactory.deployPool($cryptoPool.name, $cryptoPool.symbol, $cryptoPool.coins, $cryptoPool.A,
          $cryptoPool.gamma, $cryptoPool.midFee, $cryptoPool.outFee, $cryptoPool.allowedExtraProfit, $cryptoPool.feeGamma, $cryptoPool.adjustmentStep, 
          $cryptoPool.maHalfTime, $cryptoPool.initialPrice)
        break;
    }
    console.log(tx)
    showToast("success", $_("pool.create_pool_submitted"));
  }

  $: valid = (()=>{
    switch ($poolType) {
      case 1: 
        for (const e in Object.values($stablePool)) {
          if(e==null || e==undefined) return false
        }
        // if ($stablePool.name.length > 10) return false;
        if ($stablePool.coins[0] === $stablePool.coins[1]) return false;
        if (!$stablePool.coins[0] || !$stablePool.coins[1] ) return false;
        if ($stablePool.A > 1000 && $stablePool.A < 10) return false;
        if ($stablePool.fee > 1 && $stablePool.A < 0.04) return false;
        break
      case 2:
      for (const e in Object.values($cryptoPool)) {
          if(e==null || e==undefined) return false
        }
        // if ($cryptoPool.name.length > 10) return false;
        if ($cryptoPool.coins[0] == $cryptoPool.coins[1]) return false;
        if (!$cryptoPool.coins[0] || !$cryptoPool.coins[1] ) return false;
        break
    }
    
    return true
  })()
</script>

<div class="flex flex-row items-center justify-between space-x-4">
  <button 
    on:click={()=> $process-=1}
    class={clsx("flex items-center space-x-2","btn rounded-2xl bg-base-100 border-none hover:bg-slate-300 no-animation", $process<=0&&"disabled")}
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="fill-black h-5" viewBox="0 0 24 24" height="24" width="24">
      <path xmlns="http://www.w3.org/2000/svg" d="M14.7071 5.29289C15.0976 5.68342 15.0976 6.31658 14.7071 6.70711L9.41421 12L14.7071 17.2929C15.0976 17.6834 15.0976 18.3166 14.7071 18.7071C14.3166 19.0976 13.6834 19.0976 13.2929 18.7071L7.29289 12.7071C6.90237 12.3166 6.90237 11.6834 7.29289 11.2929L13.2929 5.29289C13.6834 4.90237 14.3166 4.90237 14.7071 5.29289Z"></path>
    </svg>
    <span class="text-base-content">{$_('pool.back')}</span>
  </button>
  {#if $process != 4}
    <button 
      on:click={()=> $process+=1}
      class={clsx("flex items-center justify-center","btn rounded-2xl bg-primary border-none hover:bg-primary no-animation", $process>=4&&"disabled")}
    >
      <span class="text-base-100 mr-2">{$_('pool.next')}</span>
      <svg xmlns="http://www.w3.org/2000/svg" class="fill-base-100 h-5" viewBox="0 0 24 24" height="24" width="24">
        <path xmlns="http://www.w3.org/2000/svg" d="M9.29289 18.7071C8.90237 18.3166 8.90237 17.6834 9.29289 17.2929L14.5858 12L9.29289 6.70711C8.90237 6.31658 8.90237 5.68342 9.29289 5.29289C9.68342 4.90237 10.3166 4.90237 10.7071 5.29289L16.7071 11.2929C17.0976 11.6834 17.0976 12.3166 16.7071 12.7071L10.7071 18.7071C10.3166 19.0976 9.68342 19.0976 9.29289 18.7071Z"></path>
      </svg>
    </button>
  {:else}
    <button 
      on:click={()=> create()}
      class={clsx("flex items-center justify-center","btn rounded-2xl bg-primary border-none hover:bg-primary no-animation",
       !valid &&"btn-disabled bg-slate-200")}
    >
      <span class="text-base-100 mr-2">{$_('pool.confirm')}</span>
      <svg xmlns="http://www.w3.org/2000/svg" class="fill-base-100 h-5" viewBox="0 0 24 24" height="24" width="24">
        <path xmlns="http://www.w3.org/2000/svg" d="M9.29289 18.7071C8.90237 18.3166 8.90237 17.6834 9.29289 17.2929L14.5858 12L9.29289 6.70711C8.90237 6.31658 8.90237 5.68342 9.29289 5.29289C9.68342 4.90237 10.3166 4.90237 10.7071 5.29289L16.7071 11.2929C17.0976 11.6834 17.0976 12.3166 16.7071 12.7071L10.7071 18.7071C10.3166 19.0976 9.68342 19.0976 9.29289 18.7071Z"></path>
      </svg>
    </button>
  {/if}
</div>