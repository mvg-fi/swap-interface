<script lang="ts">
  import { _ } from "svelte-i18n";
  import { getChainByAsset } from "$lib/helpers/utils";
  import { processDialog } from "$lib/stores/bridge/process";
  import { fetchPendingDeposit } from "$lib/helpers/mvm-api";
  import SmLoading from "$lib/components/common/smLoading.svelte";
  import { selectedFromAsset, selectedToAsset } from "$lib/stores/bridge/bridge";
  import { bridgingMode, depositAsset, destination, m1, m2, m3 } from "$lib/stores/bridge/deposit";

  $: network = getChainByAsset($selectedFromAsset.mixinChainId)?.name;
  $: toNetwork = getChainByAsset($selectedToAsset.mixinChainId)?.name;

  let emptyCount = 0;
  const rm1 = async () => {
    // 1. fetch pending deposit
    // 2. once found, fetch and update states
    // 3. after pending deposit returns empty array, check 3 times the balance to complete
    while (true) {
      console.log('run rm1')
      const result = await fetchPendingDeposit({
        asset:$selectedFromAsset.mixinAssetId, 
        destination: $destination
      });

      if (result.length > 0) {
        result
        m1.set(1)
        continue
      } 
      emptyCount++;
      if ($m1 == 1 && emptyCount >= 3) {
        m1.set(2);
        bridgingMode.set(2);
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, 3000));
    };
  }

  const rm2 = async () => {
    // 1. check network
    // 2. check approve
    // 3. check confirmation, then complete
  }

  const rm3 = async () => {
    // 1. check tx state
    // 2. if success, completed, or reverted.
  }

  // const loader = 
  (async () => {
    // clearInterval(timer)
    switch ($bridgingMode) {
      case 1:
        await rm1()
        break;
      case 2:
        break;
      case 3:
        break;
    }
  })()
  // const timer = setInterval(loader, 3000);
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
        <span class="text-xs tooltip" data-tip={`${2}/${1} ${$_("bridge.confirmations")}`}>
          x / y
        </span>
      {:else if $m1 == 2}
        <div class="w-8 h-8 flex justify-center items-center">
          <div class="bg-gray-400 rounded-full w-4 h-4"> </div>
        </div>
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
      <div class="w-8 h-8 flex justify-center items-center">
        <div class="bg-gray-400 rounded-full w-4 h-4" />
      </div>
      <!-- <SmLoading class="w-8 h-8" color="blue" /> -->
      <span class="text-xs">
        {$_("bridge.pending")}
      </span>
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
      <div class="w-8 h-8 flex justify-center items-center">
        <div class="bg-gray-400 rounded-full w-4 h-4" />
      </div>
      <!-- <SmLoading class="w-8 h-8" color="blue" /> -->

      <span class="text-xs">
        {$_("bridge.pending")}
      </span>
    </div>
  </div>

  <!-- Introduction or helper text -->
  <div class="py-5 mt-2 px-12 flex flex-col items-center justify-center text-center">
    <!-- {$_('info_text', { values: { num: 6 }})}  -->
    <span class="break-words text-xs font-light">
      Please wait around {"5"} minutes until the deposit is completed
    </span>
    <span class="break-words text-xs font-light">
      then confirm bridging to complete the process.
    </span>
  </div>

  <!-- Buttons -->
  <div class="flex justify-center items-center pb-5">
    <button class="btn btn-ghost shadow-2xl border border-base-content/5 rounded-2xl btn-disabled loading">
      {#if $m1 == 0}
        <span> {$_('bridge.deposit_pending')} </span>
      {:else if $m1 == 1}
        <span> {$_('bridge.waiting_confirmation')} </span>
      {/if}
    </button>
  </div>
</div>
