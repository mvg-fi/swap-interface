<script lang="ts">
  import clsx from "clsx"
  import { _ } from "svelte-i18n";
  import { getChainByAsset, getEVMChainId } from "$lib/helpers/utils";
  import { chainId, library } from "$lib/stores/ethers";
  import { FETCH_INTERVAL } from "$lib/helpers/constants";
  import { processDialog } from "$lib/stores/bridge/process";
  import { fetchPendingDeposit } from "$lib/helpers/mvm-api";
  import { mvmProvider, switchNetwork } from "$lib/helpers/web3";
  import CheckMark from "$lib/components/common/checkMark.svelte";
  import SmLoading from "$lib/components/common/smLoading.svelte";
  import type { ExternalTransactionResponse } from "@mixin.dev/mixin-node-sdk";
  import {
    selectedFromAsset,
    selectedToAsset,
  } from "$lib/stores/bridge/bridge";
  import {
    bridgingMode,
    depositAsset,
    destination,
    m1,
    m2,
    m3,
  } from "$lib/stores/bridge/deposit";
    import ErrorMark from "$lib/components/common/errorMark.svelte";

  $: network = getChainByAsset($selectedFromAsset.mixinChainId)?.name;
  $: toNetwork = getChainByAsset($selectedToAsset.mixinChainId)?.name;
  let fetched: ExternalTransactionResponse[], switchLoading: boolean;

  const changeNetwork = async (supposedNetwork: number) => {
    if (!$library) return false;
    switchLoading = true;
    const result = await switchNetwork($library, supposedNetwork);
    if (result === null) {
      switchLoading = false;
      console.log("changeNetwork success");
      return true;
    }
    switchLoading = false;
  };

  const rm1 = async () => {
    // 1. fetch pending deposit
    // 2. once found, fetch and update states
    // 3. after pending deposit returns empty array, check 3 times the balance to complete
    console.log("run rm1");
    fetched = await fetchPendingDeposit({
      asset: $selectedFromAsset.mixinAssetId,
      destination: $destination,
    });
    if (fetched.length > 0) {
      // found
      m1.set(1);
    }
    let i = 0;
    if ($m1 == 1 && fetched.length == 0) {
      while (i < 3) {
        fetched = await fetchPendingDeposit({
          asset: $selectedFromAsset.mixinAssetId,
          destination: $destination,
        });
        if (fetched.length == 0) i++;
        else return;
      }
      m1.set(2);
      m2.set(1);
      bridgingMode.set(2);
    }
  };

  const rm2 = async () => {
    // 1. check network is mvm
    if (Number($chainId) != 73927) {
      m2.set(1.1);
    }

    // TODO: add all these after deployed the utils contract
    // 2. check approval
    // 3. check confirmation, then complete
    if (false) {
      bridgingMode.set(2);
    }
  };

  const rm3 = async () => {
    // 1. check tx state
    m3.set(1);
    const recipient = await mvmProvider.getTransactionReceipt("tx");
    if (recipient.status === 1) {
      // success
      m3.set(2);
      bridgingMode.set(3);
    } else {
      // reverted
      m3.set(-1);
    }
  };

  const statusChecker = async () => {
    switch ($bridgingMode) {
      case 1:
        // await rm1()
        break;
      case 2:
        // await rm2()
        break;
      case 3:
        // await rm3()
        break;
    }
    if ($bridgingMode == 3) clearInterval(timer);
  };
  const timer = setInterval(statusChecker, FETCH_INTERVAL);

  const ConfirmBridging = async () => {
    if (!$chainId) return;
    const checkNetwork = async () => {
      if ($chainId != Number(73927)) {
        console.log('network is wrong')
        const changeSuccess = await changeNetwork(Number(73927));
        if (!changeSuccess) {
          // errorMessage.set($_('error.must_switch_network_to_continue'));
          return false;
        }
      }
      return true
    }
    const checkApproval = async () => {

    }

    const bridge = async () => {

    }

    if (!await checkNetwork()) return
  }

  const retry = () => {
    bridgingMode.set(2);
    m1.set(2);
    m2.set(1);
    m3.set(0);
  }
</script>

<div class="font-sans">
  <!-- Close -->
  <div class="flex justify-end px-1">
    <button
      class="flex border-none btn btn-xs btn-circle btn-ghost btn-sm"
      on:click={() => processDialog.set(false)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 stroke-black/60"
        fill="none"
        viewBox="0 0 24 24"
        ><path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        /></svg
      >
    </button>
  </div>

  <!-- Processes -->
  <div class="flex flex-row justify-center items-center mx-10 gap-x-4">
    <!-- From network -->
    <div class="flex flex-col justify-center items-center">
      <span class="text-lg">
        {$_("bridge.source")}
      </span>
      <span class="text-xs font-normal text-base-content/60 capitalize mt-3">
        {network}
      </span>

      {#if $m1 == 0}
        <SmLoading class="w-8 h-8" color="blue" />
        <span class="text-xs">
          {$_("bridge.pending")}
        </span>
      {:else if $m1 == 1}
        <SmLoading class="w-8 h-8" color="blue" />
        <span
          class="text-xs tooltip"
          data-tip={`${fetched[0].confirmations}/${fetched[0].threshold} ${$_(
            "bridge.confirmations"
          )}`}
        >
          {`${fetched[0].confirmations} / ${fetched[0].threshold}`}
        </span>
      {:else if $m1 == 2}
        <div class="w-8 h-8 flex justify-center items-center">
          <CheckMark class="w-4 h-4" color="blue" />
        </div>
        <span class="text-xs">
          {$_("bridge.completed")}
        </span>
      {/if}
    </div>

    <!-- Arrow right and placeholder-->
    <div class="flex flex-col justify-center items-center">
      <span class="text-lg invisible"> Source </span>
      <span class="text-xs text-base-content/60 capitalize mt-3 invisible">
        abcdef
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="w-4 fill-primary"
      >
        <path
          xmlns="http://www.w3.org/2000/svg"
          d="M12.2929 5.29289C12.6834 4.90237 13.3166 4.90237 13.7071 5.29289L19.7071 11.2929C19.8946 11.4804 20 11.7348 20 12C20 12.2652 19.8946 12.5196 19.7071 12.7071L13.7071 18.7071C13.3166 19.0976 12.6834 19.0976 12.2929 18.7071C11.9024 18.3166 11.9024 17.6834 12.2929 17.2929L16.5858 13L5 13C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11L16.5858 11L12.2929 6.70711C11.9024 6.31658 11.9024 5.68342 12.2929 5.29289Z"
        />
      </svg>
      <span class="text-xs invisible"> Place </span>
    </div>

    <!-- Through MVM -->
    <div class="flex flex-col justify-center items-center">
      <span class="text-lg">
        {$_("bridge.through")}
      </span>
      <span class="text-xs text-base-content/60 capitalize mt-3"> MVM </span>

      {#if $m2 == 0}
        <div class="w-8 h-8 flex justify-center items-center">
          <div class="bg-gray-400 rounded-full w-4 h-4" />
        </div>
        <span class="text-xs">
          {$_("bridge.pending")}
        </span>
      {:else if $m2 == 1}
        <SmLoading class="w-8 h-8" color="blue" />
        <span class="text-xs">
          {$_("bridge.pending")}
        </span>
      {:else if $m2 == 2}
        <div class="w-8 h-8 flex justify-center items-center">
          <CheckMark class="w-4 h-4" color="blue" />
        </div>
        <span class="text-xs">
          {$_("bridge.completed")}
        </span>
      {/if}
    </div>

    <!-- Arrow right and placeholder-->
    <div class="flex flex-col justify-center items-center">
      <span class="text-lg invisible"> Source </span>
      <span class="text-xs text-base-content/60 capitalize mt-3 invisible">
        abcdef
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="w-4 fill-primary"
      >
        <path
          xmlns="http://www.w3.org/2000/svg"
          d="M12.2929 5.29289C12.6834 4.90237 13.3166 4.90237 13.7071 5.29289L19.7071 11.2929C19.8946 11.4804 20 11.7348 20 12C20 12.2652 19.8946 12.5196 19.7071 12.7071L13.7071 18.7071C13.3166 19.0976 12.6834 19.0976 12.2929 18.7071C11.9024 18.3166 11.9024 17.6834 12.2929 17.2929L16.5858 13L5 13C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11L16.5858 11L12.2929 6.70711C11.9024 6.31658 11.9024 5.68342 12.2929 5.29289Z"
        />
      </svg>
      <span class="text-xs invisible"> Place </span>
    </div>

    <!-- To network -->
    <div class="flex flex-col justify-center items-center">
      <span class="text-lg">
        {$_("bridge.destination")}
      </span>
      <span class="text-xs text-base-content/60 capitalize mt-3">
        {toNetwork}
      </span>
      {#if $m3 == 0}
        <div class="w-8 h-8 flex justify-center items-center">
          <div class="bg-gray-400 rounded-full w-4 h-4" />
        </div>
        <span class="text-xs">
          {$_("bridge.pending")}
        </span>
      {:else if $m3 == 1}
        <SmLoading class="w-8 h-8" color="blue" />
        <span class="text-xs">
          {$_("bridge.pending")}
        </span>
      {:else if $m3 == 2}
        <div class="w-8 h-8 flex justify-center items-center">
          <CheckMark class="w-4 h-4" color="blue" />
        </div>
        <span class="text-xs">
          {$_("bridge.completed")}
        </span>
      {:else if $m3 == -1}
        <div class="w-8 h-8 flex justify-center items-center">
          <ErrorMark class="w-4 h-4" color="red" />
        </div>
        <span class="text-xs">
          {$_("bridge.reverted")}
        </span>
      {/if}
    </div>
  </div>

  <!-- Introduction or helper text -->
  <div
    class="py-5 mt-2 px-12 flex flex-col items-center justify-center text-center"
  >
    <!-- {$_('info_text', { values: { num: 6 }})}  -->
    <span class="break-words text-xs font-light">
      {$_('bridge.please_wait_x_minutes', {values:{min:5}})}
    </span>
    <span class="break-words text-xs font-light">
      {$_('bridge.then_confirm')}
    </span>
  </div>

  <!-- Buttons -->
  <div class="flex justify-center items-center pb-5">
    {#if $bridgingMode == 1}
      <button
        class="btn btn-ghost shadow-2xl border border-base-content/5 rounded-2xl btn-disabled loading"
      >
        {#if $m1 == 0}
          <span> {$_("bridge.deposit_pending")} </span>
        {:else if $m1 == 1}
          <span> {$_("bridge.waiting_confirmation")} </span>
        {:else}
          <span> {$_("bridge.waiting")} </span>
        {/if}
      </button>
    {:else if $bridgingMode == 2}
      <button
        on:click={() => ConfirmBridging()}
        class={clsx("btn btn-ghost shadow-2xl border border-base-content/5 rounded-2xl", 
        switchLoading && "loading")}
      >
        {#if switchLoading}
          <span> {$_("bridge.switching_network")} </span>
        <!-- TODO -->
        <!-- {:else if approveLoading} -->
        <!-- {:else if confirmLoading} -->
        {:else if $m2 == 1}
          <span> {$_("bridge.confirm_bridging")} </span>
        {:else}
          <span> {$_("bridge.waiting")} </span>
        {/if}
      </button>
    {:else if $bridgingMode == 3}
        <button
          on:click={()=>retry()}
          class={clsx("btn btn-ghost shadow-2xl border border-base-content/5 rounded-2xl",
          $m3 == 1 && "loading")}
        >
          {#if $m3 == 1}
            <span> {$_("bridge.fetching_result")}</span>
          {:else if $m3 == 2}
            <span> {$_("bridge.completed")}</span>
          {:else if $m3 == -1}
            <span> {$_("bridge.retry")} </span>
          {:else}
            <span> {$_("bridge.waiting")} </span>
          {/if}
        </button>
    {/if}
  </div>
</div>