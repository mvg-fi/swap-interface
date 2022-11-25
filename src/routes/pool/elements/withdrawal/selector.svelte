<script lang="ts">
  import Image from "$lib/components/common/image.svelte";

  const ranges = ["Single", "Balanced", "Custom"];
  const tooltips = [
    "Withdraw single coin",
    "Withdraw in balanced amount",
    "Set custom amount",
  ];
  let focus = -1;
  let m1focus = 0;
  const icons = [
    "https://mixin-images.zeromesh.net/zVDjOxNTQvVsA8h2B4ZVxuHoCF3DJszufYKWpd9duXUSbSapoZadC7_13cnWBqg0EmwmRcKGbJaUpA8wFfpgZA=s128",
    "https://mixin-images.zeromesh.net/UasWtBZO0TZyLTLCFQjvE_UYekjC7eHCuT_9_52ZpzmCC-X-NPioVegng7Hfx0XmIUavZgz5UL-HIgPCBECc-Ws=s128",
    "https://mixin-images.zeromesh.net/HvYGJsV5TGeZ-X9Ek3FEQohQZ3fE9LBEBGcOcn4c4BNHovP4fW4YB97Dg5LcXoQ1hUjMEgjbl1DPlKg1TW7kK6XP=s128",
    "data:image/jpeg;base64,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",
  ];
  const coins = ["USDT", "USDC", "DAI", "pUSD"];
  const amounts = [1.53, 1.43, 1.23, 1.12];
</script>

<div class="m-1 my-3">
  <div class="">
    <!-- Selector -->
    <div class="btn-group grid grid-cols-3 font-medium">
      {#each ranges as _, i}
        <button
          class="btn btn-sm bg-white hover:bg-slate-100
          border-2 border-gray-200 hover:border-gray-200 
          font-medium text-xs text-black tooltip no-margin
          {i === 0 ? 'border-r-0' : i === 2 ? 'border-l-0' : ''}
          {focus != -1 ? (i === 0 ? 'bl' : i === 2 ? 'br' : '') : ''}
          {focus === i
            ? 'bg-slate-600 border-slate-600 text-white hover:bg-slate-500 hover:border-slate-500'
            : ''}"
          data-tip={tooltips[i]}
          on:click={() => {
            focus = i;
          }}
        >
          <span>{ranges[i]}</span>
        </button>
      {/each}
    </div>

    <!-- Input -->
    {#if focus === 0}
      <div class="bg-base-100 w-full h-auto">
        <div class="grid grid-cols-{coins.length}">
          {#each coins as coin, i}
            <button
              class="flex flex-row items-center justify-center h-16 gap-1 hover:bg-slate-100
              border-2 border-gray-200 border-x-0 border-t-0
              {i === 0 ? 'bdl2' : i === coins.length - 1 ? 'bdr2' : ''}
              {m1focus === i ? 'bg-slate-100 hover:bg-slate-100' : ''}"
              on:click={() => {
                m1focus = i;
              }}
            >
              <div class="avatar w-6 mb-0.5">
                <div class="rounded-full">
                  <Image src={icons[i]} alt="" />
                </div>
              </div>
              <span class="text-sm font-semibold"> {coin} </span>
            </button>
          {/each}
        </div>
      </div>
    {:else if focus === 1}
      <div class="bg-base-100 w-full h-auto">
        <div>
          {#each coins as coin, i}
            <div
              class="flex flex-row items-center justify-start px-3 h-10 gap-1 hover:bg-slate-100 
              border-x-2 border-gray-200 border-t-0
              {i === coins.length - 1 ? 'border-b-2 rounded-b-2xl' : ''}"
            >
              <div class="avatar w-6 mb-0.5">
                <div class="rounded-full">
                  <Image src={icons[i]} alt="" />
                </div>
              </div>
              <span class="text-sm font-semibold ml-1 flex-1"> {coin} </span>
              <span> {amounts[i]} </span>
            </div>
          {/each}
        </div>
      </div>
    {:else if focus === 2}
      <div class="bg-base-100 w-full h-auto">
        <div>
          {#each coins as coin, i}
            <div
              class="flex flex-row items-center justify-start px-3 h-14 gap-1
              border-x-2 border-gray-200 border-t-0
              {i === coins.length - 1 ? 'border-b-2 rounded-b-2xl' : ''}"
            >
              <div class="avatar w-6 mb-0.5">
                <div class="rounded-full">
                  <Image src={icons[i]} alt="" />
                </div>
              </div>
              <span class="text-sm font-semibold ml-1 flex-1"> {coin} </span>
              <input class="input input-sm bg-slate-100" />
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  .tl {
    border-top-left-radius: 0;
  }
  .tr {
    border-top-right-radius: 0;
  }
  .bl {
    border-bottom-left-radius: 0 !important;
  }
  .br {
    border-bottom-right-radius: 0 !important;
  }
  .bdl2 {
    border-bottom-left-radius: 1rem !important;
    border-left-width: 2px !important;
  }
  .bdr2 {
    border-bottom-right-radius: 1rem !important;
    border-right-width: 2px !important;
  }
  .no-margin {
    margin: 0 !important;
  }
</style>
