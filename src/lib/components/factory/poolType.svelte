<script lang="ts">
  import clsx from "clsx"
  import { _ } from "svelte-i18n"
  import { poolType, process } from "$lib/stores/pool/factory";
  import Image from "$lib/components/common/image.svelte";

  let usdc = "https://mixin-images.zeromesh.net/w3Lb-pMrgcmmrzamf7FG_0c6Dkh3w_NRbysqzpuacwdVhMYSOtnX2zedWqiSG7JuZ3jd4xfhAJduQXY1rPidmywn=s128";
  let usdt = "https://mixin-images.zeromesh.net/ndNBEpObYs7450U08oAOMnSEPzN66SL8Mh-f2pPWBDeWaKbXTPUIdrZph7yj8Z93Rl8uZ16m7Qjz-E-9JFKSsJ-F=s128";
  let btc = "https://mixin-images.zeromesh.net/HvYGJsV5TGeZ-X9Ek3FEQohQZ3fE9LBEBGcOcn4c4BNHovP4fW4YB97Dg5LcXoQ1hUjMEgjbl1DPlKg1TW7kK6XP=s128"
  let eth = "https://mixin-images.zeromesh.net/zVDjOxNTQvVsA8h2B4ZVxuHoCF3DJszufYKWpd9duXUSbSapoZadC7_13cnWBqg0EmwmRcKGbJaUpA8wFfpgZA=s128"

</script>

<div class="h-64 flex flex-row items-center justify-center space-x-16 p-10 text-base-content">
  <button class={clsx("flex flex-col xl:h-[260px] xl:w-[260px] bg-base-100 rounded-2xl p-8", "cursor-pointer",
    "transition duration-200 ease-out hover:ease-in hover:scale-105 hover:bg-indigo-500 hover:text-base-100")}
    on:click={()=>{poolType.set(1); process.set(2)}}
  >
    <div class="h-4/5 flex items-center justify-center -space-x-4">
      <Image src={usdc} alt="usdc" class="h-20"/>
      <Image src={usdt} alt="usdt" class="h-20"/>
    </div>
    <span class="font-semibold text-center"> {$_('pool.pegged_asset')} </span>
  </button>

  <button class={clsx("flex flex-col xl:h-[260px] xl:w-[260px] bg-base-100 rounded-2xl p-8", "cursor-pointer",
    "transition duration-200 ease-out hover:ease-in hover:scale-105 hover:bg-indigo-500 hover:text-base-100")}
    on:click={()=>{poolType.set(2); process.set(2)}}
  >
    <div class="h-4/5 flex items-center justify-center -space-x-4">
      <Image src={btc} alt="btc" class="h-20"/>
      <Image src={eth} alt="eth" class="h-20"/>
    </div>
    <span class="font-semibold text-center"> {$_('pool.non_pegged_asset')} </span>
  </button>
</div>