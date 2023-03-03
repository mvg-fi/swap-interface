<script lang="ts">
  import clsx from "clsx";
  import { _ } from "svelte-i18n";
  import { page } from "$app/stores";
  import { switchNetwork } from "$lib/helpers/web3";
  import { connected, switchNeeded } from "$lib/stores/connect";
  import { chainId, library } from "$lib/stores/ethers";
  import {
    findAssetFromTokenListById,
    getEVMChainByAssetId,
  } from "$lib/helpers/utils";
  import { APP_PATHS, MVM_CHAIN_ID, MVM_ICON } from "$lib/helpers/constants";

  $: chainAssetID = getEVMChainByAssetId(Number($chainId) || 0);
  $: chainAsset = findAssetFromTokenListById(undefined, chainAssetID);
  $: network = Number($chainId) === 73927 ? "MVM" : chainAsset?.name;
  $: icon = Number($chainId) === 73927 ? MVM_ICON : chainAsset?.logoURI;

  let switchLoading = false;
  const changeNetwork = async () => {
    if (!$library) return;
    switchLoading = true;
    const r = await switchNetwork($library, MVM_CHAIN_ID);
    switchLoading = false;
  };

  $: routeRequires = $page.url.pathname.includes(APP_PATHS[0]) || $page.url.pathname.includes(APP_PATHS[1])
  $: routeNeeded = $switchNeeded && routeRequires && $chainId != MVM_CHAIN_ID;
</script>

<!-- <div class="btn btn-ghost mx-2"> -->
<!-- 1. routeNeeded -->
<!-- 2. loading -->
<!-- 3. normal -->
{#if $connected}
  <div class="mx-3">
    {#if switchLoading}
      <button
        class="btn rounded-2xl loading btn-ghost bg-transparent items-center justify-center flex"
      >
        <span class="text-base-content">
          {$_("navbar.confirm_in_wallet")}
        </span>
      </button>

    {:else if routeNeeded}
      <button
        on:click={() => changeNetwork()}
        data-tip={$_("navbar.click_to_switch_network")}
        class="btn rounded-2xl btn-ghost bg-transparent items-center justify-center flex flex-row tooltip tooltip-bottom gap-x-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-5 h-5">
          <path xmlns="http://www.w3.org/2000/svg" d="M12 14C11.4477 14 11 13.5523 11 13V10C11 9.44772 11.4477 9 12 9C12.5523 9 13 9.44772 13 10V13C13 13.5523 12.5523 14 12 14Z" class="fill-red-500"></path>
          <path xmlns="http://www.w3.org/2000/svg" d="M10.5 16.5C10.5 15.6716 11.1716 15 12 15C12.8284 15 13.5 15.6716 13.5 16.5C13.5 17.3284 12.8284 18 12 18C11.1716 18 10.5 17.3284 10.5 16.5Z" class="fill-red-500"></path>
          <path xmlns="http://www.w3.org/2000/svg" d="M10.2301 3.2156C10.98 1.79093 13.02 1.79092 13.7698 3.2156L22.1135 19.0685C22.8144 20.4003 21.8486 22 20.3436 22H3.65635C2.15133 22 1.18556 20.4003 1.88651 19.0685L10.2301 3.2156ZM20.3436 20L12 4.1471L3.65635 20L20.3436 20Z" class="fill-red-500"></path>
        </svg>
        <span class="text-red-500"> {$_("navbar.unsupported_network")} </span>
      </button>
    
    {:else if icon == undefined || network == undefined }
      <button class="btn btn-ghost">
        <!-- <div class="rounded-full mr-2 mb-0.5">
          <img src={icon} alt="none" class="h-[20px]" />
        </div> -->
        <span class="text-base-content"> {$_("navbar.unsupported_network")} </span>
      </button>
    {:else}
      <button class="btn btn-ghost">
        <div class="rounded-full mr-2 mb-0.5">
          <img src={icon} alt="mvm" class="h-[20px]" />
        </div>
        <span class="font-semibold">
          {network}
        </span>
      </button>
    {/if}
  </div>
{:else}
  <button class="btn btn-ghost">
    <div class="rounded-full mr-2 mb-0.5">
      <img src={MVM_ICON} alt="mvm" class="h-[20px]" />
    </div>
    <span class="font-semibold">
      {"MVM"}
    </span>
  </button>
{/if}
