<script lang="ts">
  import { _ } from "svelte-i18n";
  import {
    _receiveAmount,
  } from "$lib/stores/bridge/bridge";
  import QuestionMark from "../common/questionMark.svelte";

  $: Fees = 0;
</script>

<!-- Fee is the sum of the: 
  1. Deposit gas (when evm compatible)
  2. MVM call contract gas
  3. Withdrawal Fee
-->

<div class="card px-4 py-2 flex flex-col space-y-4">
  <div class="flex flex-row items-center">
    <span class="text-lg font-semibold">{$_('bridge.fees')}</span>
    <QuestionMark message={$_('bridge.fee_is_the_sum_of')} class="ml-1.5" />
    <div class="flex-1 text-right">
      <span class="text-lg font-semibold"> {Fees === 0 ? '-' : Fees} </span>
    </div>
  </div>

  <div class="flex flex-row items-center">
    <span class="text-lg font-bold">{$_('bridge.estimated_received')}</span>
    <QuestionMark message={$_('bridge.bridge_info')} class="ml-1.5" />
    <div class="flex-1 text-right">
      <span class="text-lg font-extrabold"> {$_receiveAmount.isNaN() ? '-' : $_receiveAmount} </span>
    </div>
  </div>
</div>