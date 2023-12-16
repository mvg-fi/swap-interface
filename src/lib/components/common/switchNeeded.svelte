<script lang="ts">
  import clsx from "clsx"
  import { _ } from "svelte-i18n";
  import { fade } from "svelte/transition";
  import { library } from "$lib/stores/ethers";
  import { switchNetwork } from "$lib/helpers/web3";
  import { MVM_CHAIN_ID } from "$lib/helpers/constants";

  let switchLoading = false;
  let switchLoaded = false;

  const changeNetwork = async () => {
    if (!$library) return;
    switchLoading = true;
    const s = await switchNetwork($library, MVM_CHAIN_ID);
    switchLoading = false;
    if (s==null) switchLoaded = true;
  };
</script>

<div class="alert p-3 px-4 max-w-[480px] bg-red-400 text-base-100" in:fade|global>
  <div>
    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    <div>
      <h3 class="font-bold"> { $_("swap.network_incorrect") } </h3>
      <div class="text-xs"> { $_("swap.please_switch_to_mvm") } </div>
    </div>
  </div>
  {#if switchLoaded}
    <div class="flex-none">
      <button
        class="btn btn-sm btn-ghost hover:bg-red-400 items-center justify-center flex"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-4">
          <path xmlns="http://www.w3.org/2000/svg" d="M20.6644 5.2526C21.0772 5.61952 21.1143 6.25159 20.7474 6.66437L10.0808 18.6644C9.89099 18.8779 9.61898 19 9.33334 19C9.04771 19 8.7757 18.8779 8.58593 18.6644L3.2526 12.6644C2.88568 12.2516 2.92286 11.6195 3.33565 11.2526C3.74843 10.8857 4.3805 10.9229 4.74742 11.3356L9.33334 16.4948L19.2526 5.33565C19.6195 4.92286 20.2516 4.88568 20.6644 5.2526Z" class="stroke-base-100"></path>
        </svg>
      </button>
    </div>
  {:else}
    <div class="flex-none">
      <button class={
        clsx("btn btn-sm btn-ghost switch-btn border border-slate-100 border-opacity-40 hover:border-slate-100 hover:border-opacity-50", switchLoading && "loading")}
        on:click={ () => changeNetwork() }
      >
        {$_('swap.switch')}
      </button>
    </div>
  {/if}
</div>

<style>
  .switch-btn {
    transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, opacity 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms
  }
</style>