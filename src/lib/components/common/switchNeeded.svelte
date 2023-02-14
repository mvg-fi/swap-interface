<script lang="ts">
  import clsx from "clsx"
  import { _ } from "svelte-i18n";
  import { fade } from "svelte/transition";
  import { library } from "$lib/stores/ethers";
  import { switchNetwork } from "$lib/helpers/web3";
  import { MVM_CHAIN_ID } from "$lib/helpers/constants";

  let switchLoading = false;

  const changeNetwork = async () => {
    if (!$library) return;

    switchLoading = true;
    await switchNetwork($library, MVM_CHAIN_ID);
    switchLoading = false;
  };
</script>

<div class="alert p-3 px-4 max-w-[480px] bg-error text-base-100" in:fade>
  <div>
    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    <div>
      <h3 class="font-bold"> { $_("swap.network_incorrect") } </h3>
      <div class="text-xs"> { $_("swap.please_switch_to_mvm") } </div>
    </div>
  </div>
  <div class="flex-none">
    <button class={
      clsx("btn btn-sm btn-ghost switch-btn border border-slate-100 border-opacity-40 hover:border-slate-100 hover:border-opacity-50", switchLoading && "loading")}
      on:click={ () => changeNetwork() }
    >
      {$_('swap.switch')}
    </button>
  </div>
</div>

<style>
  .switch-btn {
    transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, opacity 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms
  }
</style>