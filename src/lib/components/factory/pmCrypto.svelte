<script lang="ts">
  import clsx from "clsx"
  import { _ } from "svelte-i18n"
  import { stablePool } from "$lib/stores/pool/factory";

  const AList = [10, 50, 100, 200, $_('pool.custom')]
  const FeeList = [0.04, 0.1, 0.5, 1, $_('pool.custom')]
  $: ACustomEnabled = !AList.includes($stablePool.A);
  $: FeeCustomEnabled = !FeeList.includes($stablePool.fee);
</script>

<div class="flex flex-col space-y-4">
  <div>
    <span class="font-semibold"> A: ({$_("pool.amplification_coefficient")}) </span>
  </div>
  <div class="btn-group w-full">
    {#each AList as a}
      <button 
        on:click={()=>{
          if(a == $_('pool.custom')) {
            $stablePool.A = 0
            return
          }
          $stablePool.A = Number(a)
        }}
        class={clsx("btn bg-base-100 hover:bg-base-200 border-none",
          "text-base-content hover:text-base-content",
          !ACustomEnabled && a == $stablePool.A && "btn-active hover:bg-primary hover:text-base-100",
          ACustomEnabled && a == $_('pool.custom') && "btn-active hover:bg-primary hover:text-base-100"
      )}>
        {a}
      </button>
    {/each}
    {#if ACustomEnabled}
      <div>
        <input class="input rounded-lg focus:outline-none" placeholder={$_("pool.enter_custom_a")} bind:value={$stablePool.A} />
      </div>
    {/if}
  </div>
</div>