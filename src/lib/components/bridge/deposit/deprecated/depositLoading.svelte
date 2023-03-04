<!-- 4 -->
<script lang="ts">
  import { _ } from "svelte-i18n";
  import { depositAsset } from "$lib/stores/bridge/deposit";
  import { fetchPendingDeposit } from "$lib/helpers/mvm-api";
  import { selectedFromAsset } from "$lib/stores/bridge/bridge";
  import type { ExternalTransactionResponse } from "@mixin.dev/mixin-node-sdk";
  import WaitingDeposit from "$lib/components/bridge/deposit/pendingDeposit/waitingDeposit.svelte";

  let found = true;
  let succeed = false;
  let result: ExternalTransactionResponse[];
  
  const timer = setInterval(async () => {
    result = await fetchPendingDeposit({
      asset: $selectedFromAsset.mixinAssetId,
      destination: $depositAsset.asset_id,
    });
    if (result.length != 0) found = true;
    else if (result.length === 0 && found === false) return;
    // else if (result.length === 0 && found === true) succeed = true;

    console.log("result:", result);
  }, 3000);

  result = [
    {
      transaction_id: "045896f9-5876-4895-a6ea-a2873f029a52",
      transaction_hash:
        "0x575a189b337f782537739f87fc5616a2322653af77cb11d44625034d92d351a7",
      sender: "0x1AE60D36412a6745fce4d4935FF5Bf2b8139a371",
      chain_id: "b7938396-3f94-4e0a-9179-d3440718156f",
      asset_id: "b7938396-3f94-4e0a-9179-d3440718156f",
      amount: "0.00123",
      destination: "0xB14F5F5483E37E80243cEf6291D4c0DE1E3738e0",
      tag: "",
      confirmations: "25",
      threshold: "128",
      created_at: "2023-01-12T13:14:48.226106622Z",
    },
    {
      transaction_id: "045896f9-5876-4895-a6ea-a2873f029a52",
      transaction_hash:
        "0x575a189b337f782537739f87fc5616a2322653af77cb11d44625034d92d351a7",
      sender: "0x1AE60D36412a6745fce4d4935FF5Bf2b8139a371",
      chain_id: "b7938396-3f94-4e0a-9179-d3440718156f",
      asset_id: "b7938396-3f94-4e0a-9179-d3440718156f",
      amount: "0.00123",
      destination: "0xB14F5F5483E37E80243cEf6291D4c0DE1E3738e0",
      tag: "",
      confirmations: "32",
      threshold: "128",
      created_at: "2023-01-12T13:14:48.226106622Z",
    },
  ];
</script>

{#if !found && !succeed}
  <WaitingDeposit />
{:else if found && !succeed}
  <div
    class="deposit-pending flex flex-col w-full h-full"
  >
    <div class="text-center">
      <span class="font-normal text-base text-base-content">
        {$_("bridge.ongoing_deposits")}
      </span>
    </div>
    
      <div class="flex flex-col">
        <span> { result[0].confirmations }/{result[0].threshold} </span>
      </div>
    
  </div>
{:else if found && succeed}
  <div
    class="deposit-succeed flex flex-col justify-center items-center w-full h-full"
  >
    12
  </div>
{/if}
