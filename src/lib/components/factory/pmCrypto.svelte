<script lang="ts">
  import clsx from "clsx";
  import { _ } from "svelte-i18n";
  import {
    cryptoPool,
    volatile,
    less_volatile,
    blank,
  } from "$lib/stores/pool/factory";

  let selected = $_("pool.volatile");
  const selectList = [
    $_("pool.volatile"),
    $_("pool.less_volatile"),
    $_("pool.custom"),
  ];
</script>

<div class="flex flex-col">
  <div class="grid grid-cols-3 btn-group">
    {#each selectList as a, i}
      <button
        on:click={() => {
          selected = a;
          if (i == 0) cryptoPool.set({ ...$cryptoPool, ...volatile });
          if (i == 1) cryptoPool.set({ ...$cryptoPool, ...less_volatile });
          if (i == 2) cryptoPool.set({ ...$cryptoPool, ...blank})
        }}
        class={clsx(
          "btn !rounded-b-none bg-base-100 hover:bg-base-200 border-none",
          "text-base-content hover:text-base-content",
          a == selected && "btn-active hover:bg-primary hover:text-base-100"
        )}
      >
        {a}
      </button>
    {/each}
  </div>
  {#if selected != $_("pool.custom")}
    <div
      class="card w-full flex flex-col space-y-2 p-6 bg-base-100 rounded-t-none rounded-b-2xl"
    >
      <span>
        A: {$cryptoPool.A}
      </span>
      <span>
        Gamma: {$cryptoPool.gamma}
      </span>
      <span>
        Mid Fee: {$cryptoPool.midFee}
      </span>
      <span>
        Out Fee: {$cryptoPool.outFee}
      </span>
      <span>
        Allowed Extra Profit: {$cryptoPool.allowedExtraProfit}
      </span>
      <span>
        Fee Gamma: {$cryptoPool.feeGamma}
      </span>
      <span>
        Adjustment step: {$cryptoPool.adjustmentStep}
      </span>
      <span>
        MA Half time: {$cryptoPool.maHalfTime}
      </span>
      <div>
        <span>
          Initial Price:
        </span>
        <input bind:value={$cryptoPool.initialPrice} placeholder={$_('pool.current_price1/price2')} class="input input-sm input-bordered ml-2 focus:outline-none" />
      </div>
    </div>
  {:else}
    <div
      class="card w-full flex flex-col space-y-2 p-6 bg-base-100 rounded-t-none rounded-b-2xl"
    >
      <div>
        <span>
          A: 
        </span>
        <input bind:value={$cryptoPool.A} placeholder="4000 <= X <= 4000000000" class="input input-sm input-bordered ml-2 focus:outline-none" />
      </div>

      <div>
        <span>
          Gamma:
        </span>
        <input bind:value={$cryptoPool.gamma} placeholder="1e-8 <= X <= 0.02" class="input input-sm input-bordered ml-2 focus:outline-none" />
      </div>
      
      <div>
        <span>
          Mid Fee:
        </span>
        <input bind:value={$cryptoPool.midFee} placeholder="0.005 <= X < 100" class="input input-sm input-bordered ml-2 focus:outline-none" />
      </div>

      <div>
        <span>
          Out Fee:
        </span>
        <input bind:value={$cryptoPool.outFee} placeholder="Mid Fee <= X < 100" class="input input-sm input-bordered ml-2 focus:outline-none" />
      </div>

      <div>
        <span>
          Allowed Extra Profit:
        </span>
        <input bind:value={$cryptoPool.allowedExtraProfit} placeholder="0 <= X <= 0.01" class="input input-sm input-bordered ml-2 focus:outline-none" />
      </div>

      <div>
        <span>
          Fee Gamma:
        </span>
        <input bind:value={$cryptoPool.feeGamma} placeholder="0 < X <= 1" class="input input-sm input-bordered ml-2 focus:outline-none" />
      </div>

      <div>
        <span>
          Adjustment step:
        </span>
        <input bind:value={$cryptoPool.adjustmentStep} placeholder="0 < X <= 1" class="input input-sm input-bordered ml-2 focus:outline-none" />
      </div>

      <div>
        <span>
          MA Half time:
        </span>
        <input bind:value={$cryptoPool.maHalfTime} placeholder="0 < X < 604800; seconds" class="input input-sm input-bordered ml-2 focus:outline-none" />
      </div>

      <div>
        <span>
          Initial Price:
        </span>
        <input bind:value={$cryptoPool.initialPrice} placeholder={$_('pool.current_price1/price2')} class="input input-sm input-bordered ml-2 focus:outline-none" />
      </div>
      
    </div>
  {/if}
</div>
