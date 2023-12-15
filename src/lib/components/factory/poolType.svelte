<script lang="ts">
  import clsx from "clsx"
  import { _ } from "svelte-i18n"
  import { poolType, process } from "$lib/stores/pool/factory";
  import Image from "$lib/components/common/image.svelte";

  let usdc = "https://mixin-images.zeromesh.net/w3Lb-pMrgcmmrzamf7FG_0c6Dkh3w_NRbysqzpuacwdVhMYSOtnX2zedWqiSG7JuZ3jd4xfhAJduQXY1rPidmywn=s128";
  let usdt = "https://mixin-images.zeromesh.net/ndNBEpObYs7450U08oAOMnSEPzN66SL8Mh-f2pPWBDeWaKbXTPUIdrZph7yj8Z93Rl8uZ16m7Qjz-E-9JFKSsJ-F=s128";
  let btc = "https://mixin-images.zeromesh.net/HvYGJsV5TGeZ-X9Ek3FEQohQZ3fE9LBEBGcOcn4c4BNHovP4fW4YB97Dg5LcXoQ1hUjMEgjbl1DPlKg1TW7kK6XP=s128"
  let eth = "https://mixin-images.zeromesh.net/zVDjOxNTQvVsA8h2B4ZVxuHoCF3DJszufYKWpd9duXUSbSapoZadC7_13cnWBqg0EmwmRcKGbJaUpA8wFfpgZA=s128"

  const items = [
    {n0: "usdc", n1: "usdt", i0:usdc, i1: usdt, t: $_('pool.pegged_asset'), v: 1},
    {n0: "btc", n1: "eth", i0:btc, i1: eth, t: $_('pool.non_pegged_asset'), v: 2},
  ]
</script>

<div class="flex flex-col md:flex-row items-center justify-center p-2 md:p-10 mt-4 md:mt-2">
  {#each items as item}
  <button class={clsx("flex flex-row md:flex-col items-center w-72 md:h-[200px] md:w-[200px] xl:h-[260px] xl:w-[260px] bg-base-100 rounded-2xl p-8 md:mr-16", item.v===2&&"mt-4 md:mt-0", "cursor-pointer",
    "transition duration-200 ease-out hover:ease-in hover:scale-105 hover:bg-indigo-500 hover:text-base-100")}
    on:click={()=>{poolType.set(item.v); process.set(2)}}
  >
    <div class="md:h-40 flex items-center justify-center -space-x-4">
      <Image src={item.i0} alt={item.n0} class="h-12 md:h-20"/>
      <Image src={item.i1} alt={item.n1} class="h-12 md:h-20"/>
    </div>
    <span class={clsx("font-semibold text-center ml-4 md:ml-0", item.v===2&&"md:mt-2")}> {item.t} </span>
  </button>
  {/each}
</div>