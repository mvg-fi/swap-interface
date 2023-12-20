<script type="ts">
  import { _ } from "svelte-i18n";
  import tokens from "$lib/constants/tokenlist.json";
  import { onMount } from "svelte";

  $: showcases1 = Object.values(tokens).slice(0, 36);
  $: showcases2 = Object.values(tokens).slice(36, 72);
  $: showcases3 = Object.values(tokens).slice(72, 108);
  let loaded = false;
  const b = async () => {
    const r = await fetch("https://api.mixin.one/network/assets/top");
    const data = await r.json();
    const fin = data.data.filter(
      (asset) =>
        !/(Pando Rings|4swap |ExinSwap |Pando Innovation ETF|LP Token)/i.test(
          asset.name,
        ) && asset.chain_id !== "17f78d7c-ed96-40ff-980c-5dc62fecbc85",
    );
    showcases1 = fin.slice(0, 52);
    showcases2 = fin.slice(52, 104);
    showcases3 = fin.slice(104, 156);
    loaded = true;
  };

  onMount(b);
</script>

<div
  class="w-full h-full flex flex-col align-center text-center bg-base-100 bgi"
>
  <span
    class="text-4xl font-extrabold text-center md:5xl lg:text-7xl 2xl:text-8xl smt mb-4 md:mb-6"
  >
    {$_("technology")}
  </span>

  <span class="text-lg leading-8 text-gray-600 px-4">
    {$_("technology_t")}
  </span>

  <div class="flex justify-center gap-x-6">
    <button class="btn btn-sm md:btn-md mt-4 md:mt-8 transition">
      <span>
        {$_("about_technology")} →
      </span>
    </button>
  </div>

  <div
    class="mx-auto mt-16 w-64 h-64 md:w-80 md:h-80 2xl:w-[32rem] 2xl:h-[32rem]"
  >
    <div class="flex flex-col justify-start space-y-8 h-full">
      <!-- Line 1 -->
      <div class="relative overflow-x-hidden h-14">
        <div
          class="flex flex-row gap-x-2 md:gap-x-5 absolute top-0 bottom-0 animate-marquee-1"
        >
          {#each showcases1 as it}
            <img
              src={loaded ? it.icon_url : it.logoURI}
              alt={it.symbol}
              class="w-14 md:w-14 2xl:w-20 shrink-0 aspect-square"
            />
          {/each}
        </div>
      </div>

      <!-- Line 2 -->
      <div class="relative overflow-hidden h-14">
        <div
          class="flex flex-row gap-x-2 md:gap-x-5 absolute top-0 bottom-0 animate-marquee-reserve"
        >
          {#each showcases2 as it}
            <img
              src={loaded ? it.icon_url : it.logoURI}
              alt={it.symbol}
              class="w-14 md:w-14 2xl:w-20 shrink-0 aspect-square"
            />
          {/each}
        </div>
      </div>

      <!-- Line 3 -->
      <div class="relative overflow-hidden h-14">
        <div
          class="flex flex-row gap-x-2 md:gap-x-5 absolute top-0 bottom-0 animate-marquee-3"
        >
          {#each showcases3 as it}
            <img
              src={loaded ? it.icon_url : it.logoURI}
              alt={it.symbol}
              class="w-14 md:w-14 2xl:w-20 shrink-0 aspect-square"
            />
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .smt {
    margin-top: 20vh;
  }
  .animate-marquee-1 {
    animation: marquee-1 60s linear infinite;
  }
  .animate-marquee-3 {
    animation: marquee-3 60s linear infinite;
  }
  .animate-marquee-reserve {
    animation: marquee-reserve 60s linear infinite;
  }

  @keyframes marquee-1 {
    0% {
      transform: translate(0%);
    }

    100% {
      transform: translateX(-100%);
    }
  }
  @keyframes marquee-3 {
    0% {
      transform: translateX(0%);
    }

    100% {
      transform: translateX(-100%);
    }
  }
  @keyframes marquee-reserve {
    0% {
      transform: translateX(-100%);
    }

    100% {
      transform: translateX(0%);
    }
  }
</style>
