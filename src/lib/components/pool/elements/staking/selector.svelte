<script>
  import clsx from "clsx";
  import { _ } from "svelte-i18n"
  import { stakeMode } from "$lib/stores/pool/pools";
  import Loading from "$lib/components/pool/elements/deposit/loading.svelte";

  const ranges = [
    $_("technical.stake"),
    $_("pool.deposit_and_stake"),
    $_("technical.unstake"),
  ];
  const tooltips = [
    $_("technical.stake_t"),
    $_("pool.deposit_and_stake_t"),
    $_("technical.unstake_t"),
  ];
</script>

<div class="m-1 my-3">
  <div class="">
    <!-- Selector -->
    <div class="join grid grid-cols-3 font-medium">
      {#each ranges as _, i}
        <button
          class={clsx("btn btn-sm bg-base-100 hover:bg-base-200 border border-base-300 join-item", 
            "hover:border-base-300 font-medium text-xs text-base-content tooltip m-0 first:border-r-0 last:border-l-0", 
            $stakeMode === i && 'bg-base-300 border-base-200 hover:bg-base-200 hover:border-base-100')
          }
          data-tip={tooltips[i]}
          on:click={() => {
            stakeMode.set(i);
          }}
        >
          <span>{ranges[i]}</span>
        </button>
      {/each}
    </div>
  </div>
</div>