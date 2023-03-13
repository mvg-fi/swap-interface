<script lang="ts">
  import clsx from "clsx"
  import { _ } from "svelte-i18n";
  import { Contract } from "ethers";
  import { connected } from "$lib/stores/connect";
  import { switchNetwork } from "$lib/helpers/web3";
  import { providerLogo } from "$lib/stores/provider";
  import { address, userKey } from "$lib/stores/user";
  import ERC20ABI from "$lib/constants/abis/erc20.json";
  import { chainId, library } from "$lib/stores/ethers";
  import { mode, processDialog } from "$lib/stores/bridge/process";
  // import { mode, supposedNetwork } from "$lib/stores/bridge/process";
  import { getAddress, parseEther, parseUnits } from "ethers/lib/utils";
  import { MixinApi, type AssetResponse } from "@mixin.dev/mixin-node-sdk";
  import { depositAsset, errorMessage } from "$lib/stores/bridge/deposit";
  import { getChainByAsset, toHex, getEVMChainId } from "$lib/helpers/utils";
  import { evmCompatible, receiveAmount, selectedFromAsset, selectedToAsset, _payAmount } from "$lib/stores/bridge/bridge";
    import QuestionMark from "$lib/components/common/questionMark.svelte";
  
  let sendLoading = false
  let switchLoading = false
  let Asset: AssetResponse;

  $: if ($connected) {
    const MixinClient = MixinApi({
      keystore: {
        user_id: $userKey.client_id,
        private_key: $userKey.private_key,
        session_id: $userKey.session_id,
      },
    })
    MixinClient.asset.fetch($selectedFromAsset.mixinAssetId).then(v => {
        Asset=v
        depositAsset.set(v)
      }
    );
  }
  $: network = getChainByAsset($selectedFromAsset.mixinChainId)?.name;
  $: toNetwork = getChainByAsset($selectedToAsset.mixinChainId)?.name;
  $: isNative = $selectedFromAsset.mixinChainId === $selectedFromAsset.mixinAssetId;

  const changeNetwork = async (supposedNetwork: number) => {
    if (!$library) return false;
    switchLoading = true;
    const result = await switchNetwork($library, supposedNetwork);
    if (result === null) {
      switchLoading = false;
      console.log('changeNetwork success')
      return true;
    }
    switchLoading = false;
  };

  const deposit = async () => {
    sendLoading = true;
    if ($library == undefined) return;
    
    try{
      const signer = $library.getSigner();

      if (isNative) {
        const tx = await signer.sendTransaction({
          from: getAddress($address),
          to: Asset.deposit_entries[0].destination,
          value: parseEther($_payAmount.toFixed()),
          chainId: Number(toHex(String($chainId))),
          gasPrice: (await $library.getGasPrice()).mul(130).div(100),
        });
        console.log("tx:", tx);
        console.log(tx.hash);
        console.log(tx.blockNumber);
        // tx_hash, block_number, confirmations
      } else {
        // ERC20
        console.log("ERC20:", Asset.name, Asset.asset_key);
        const c = new Contract(Asset.asset_key, ERC20ABI, $library);
        const d = await c.decimals();
        console.log("d:", d);
        console.log("S:", $_payAmount);
        // TODO: fix parse error
        const v = parseUnits($_payAmount.toFixed(), d);
        console.log("v:", v);
        const tx = await c
          .connect(signer)
          .transfer(Asset.deposit_entries[0].destination, v);
        console.log("tx:", tx);
      }
      // TODO: if success, switch to load mode
    } catch (e) {
      console.log('code:', e.code)
      console.log('message:',e.message);
      errorMessage.set(e.message);
      // TODO: close dialog and show error
    } finally {
      sendLoading = false;
    }
  }

  const start = async () => {
    // Check network
    if (!$chainId) return;
    const supposedNetwork = Number(getEVMChainId($selectedFromAsset.mixinChainId));
    const checkNetwork = async () => {
      if (supposedNetwork != $chainId) {
        console.log('network is wrong')
        switchLoading = true;
        const changeSuccess = await changeNetwork(supposedNetwork);
        if (!changeSuccess) {
          errorMessage.set($_('error.must_switch_network_to_continue'));
          return false;
        }
        switchLoading = false
      }
      return true
    }
    if (!await checkNetwork()) return
    await deposit()
  }
</script>

<div class="flex flex-col py-1 font-sans">

  <!-- Close -->
  <div class="flex justify-end px-1">
    <button
      class="flex border-none btn btn-xs btn-circle btn-ghost btn-sm"
      on:click={() => processDialog.set(false)}
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 stroke-black/60" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
    </button>
  </div>

  <!-- Send asset from network to network -->
  <div class="flex justify-center text-lg">
    <span class="">
      {$_("bridge.send")}
    <span>
    <span class="font-bold">
      {$_payAmount} {$selectedFromAsset.symbol}
    </span>
    <span>
      {$_("bridge.from")} {network}
    </span>
    <span>
      {$_("bridge.to")} {toNetwork}
    </span>

  </div>

  <!-- Estimated received -->
  <div class="flex flex-col py-3 text-center">
    <span class="text-gray-700 [[data-theme=dark]_&]:text-white/40">
      {$_('bridge.estimated_received')}:
    </span>
    <div class="flex flex-row justify-center items-center">
      <span class="font-semibold">
        {$receiveAmount} {$selectedToAsset.symbol}
      </span>
      <QuestionMark class="mt-1 ml-1 tooltip-bottom" message={`${$_('bridge.estimated_received')} = ${$_('bridge.pay_amount')} - ${$_('bridge.withdrawal_fee')} - ${$_('bridge.gas_fee')}. ${$_('bridge.this_value_may_change')}`} />
    </div>
  </div>

  <!-- Make sure network -->
  {#if $evmCompatible}
    <div class="flex justify-center text-center mt-1 opacity-60">
      <div class="text-xs w-48 break-words">
        <span>
          {$_('bridge.make_sure_network')}
        </span>
        <span class="font-semibold">
          {network}
        </span>
        <span>
          {$_('bridge.network')}
        </span>
      </div>
    </div>
  {:else}
    <div class="flex justify-center text-center mt-1 opacity-60">
      <div class="text-xs w-52 break-words">
        <span>
         {network} {$_('bridge.network_is_not_evm_compatible')}
        </span>
      </div>
    </div>
  {/if}

  <!-- Buttons -->
  <div class="flex flex-row justify-center gap-x-4 py-4">
    <button class="btn btn-ghost btn-xl rounded-3xl shadow-md" on:click={()=>mode.set(1)}>
      {$_('bridge.view_address')}
    </button>

    {#if $evmCompatible}
    <!-- SwitchNetwork -->
    <!-- Deposit -->
      <button class={clsx("btn btn-ghost bg-base-100 btn-xl rounded-3xl shadow-xl", switchLoading && "loading", sendLoading && "loading")} on:click={() => start()}>
        {#if switchLoading}
          <span>{$_('bridge.switching_network')}</span>
        {:else}
          {#if !sendLoading}
            <img
              alt=""
              src={$providerLogo}
              class={clsx("w-3 mr-3 md:h-5 md:w-5")}
            />
          {/if}
          <span>{sendLoading ? $_('bridge.sending') : $_('bridge.send')}</span>
        {/if}
      </button>
    {/if}
  </div>
</div>