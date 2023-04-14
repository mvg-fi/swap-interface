<script lang="ts">
  import { _ } from "svelte-i18n"
  import PrevNext from "$lib/components/factory/prevNext.svelte";
  import { cryptoPool, poolName, poolTokenAddresses, poolType, stablePool } from "$lib/stores/pool/factory";

  $poolType == 1 ? 
    (()=>{$stablePool.coins=$poolTokenAddresses; $stablePool.name=$poolName; $stablePool.symbol=$poolName})() :
    (()=>{$cryptoPool.coins=$poolTokenAddresses; $cryptoPool.name=$poolName; $cryptoPool.symbol=$poolName})()
</script>

<div class="flex flex-col space-y-6 px-40 text-base-content">
  <div class="card w-full p-6 bg-base-100 rounded-2xl">
    {#if $poolType == 1}
      <ul>
        <li class="py-1"> Type: Pegged </li>
        {#each Object.keys($stablePool).slice(0, -2) as key}
          {#if Array.isArray($stablePool[key])}
            <li class="py-1 flex flex-col space-y-2">
              <div>
                <span class="capitalize">coin 0:</span>
                <span> {$stablePool[key][0]} </span>
              </div>
              <div>
                <span class="capitalize">coin 1:</span>
                <span>{$stablePool[key][1]}</span>
              </div>
            </li>
          {:else}
            <li class="py-1">
              <span class="capitalize">{key}:</span>
              <span>{$stablePool[key]}</span>
            </li>
          {/if}
        {/each}
      </ul>
    {:else if $poolType == 2}
      <ul>
        <li class="py-1"> Type: Non-Pegged </li>
        {#each Object.keys($cryptoPool) as key}
          {#if Array.isArray($cryptoPool[key])}
            <li class="py-1 flex flex-col space-y-2">
              <div>
                <span class="capitalize">coin 0:</span>
                <span> {$cryptoPool[key][0]} </span>
              </div>
              <div>
                <span class="capitalize">coin 1:</span>
                <span>{$cryptoPool[key][1]}</span>
              </div>
            </li>
          {:else}
            <li class="py-1">
              <span class="capitalize">{key}:</span>
              <span>{$cryptoPool[key]}</span>
            </li>
          {/if}
        {/each}
      </ul>
    {/if}
  </div>

  <div class="flex flex-col card bg-red-200 [[data-theme=dark]_&]:bg-red-800 text-base-content rounded-2xl mt-2 p-6">
    <span>For this pool to be valid, it must:</span>

    <span>- Have a name (max 10 characters) </span>
    <span>- Have enough tokens and not have any duplicate tokens</span>
    <span>- Use valid parameters (i.e. within the bounds of valid ranges) </span>
  </div>
  <div class="pt-8">
    <PrevNext />
  </div>
</div>


<!-- {
  "hash": "0x347d9a775694c9901edb52dfb915b739460a5feb74281ba98e4735626a59d01a",
  "type": 2,
  "accessList": null,
  "blockHash": null,
  "blockNumber": null,
  "transactionIndex": null,
  "confirmations": 0,
  "from": "0x1AE60D36412a6745fce4d4935FF5Bf2b8139a371",
  "gasPrice": {
    "_hex": "0x02faf080",
    "_isBigNumber": true
  },
  "maxPriorityFeePerGas": {
    "_hex": "0x02faf080",
    "_isBigNumber": true
  },
  "maxFeePerGas": {
    "_hex": "0x02faf080",
    "_isBigNumber": true
  },
  "gasLimit": {
    "_hex": "0x114de4",
    "_isBigNumber": true
  },
  "to": "0x3a77CFb690Fa020737B1Efd399B64bb2b10e1eF3",
  "value": {
    "_hex": "0x00",
    "_isBigNumber": true
  },
  "nonce": 300,
  "data": "0xc955fa0400000000000000000000000000000000000000000000000000000000000001c000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000e42ae5649b3a67842af0f3fc21d09d9b850a694000000000000000000000000bac65f64cd7ac8a2e71800c504b1e61d8c4050150000000000000000000000000000000000000000000000000000000000061a80000000000000000000000000000000000000000000000000000083e0717e100000000000000000000000000000000000000000000000000000000000018cba800000000000000000000000000000000000000000000000000000000002aea540000000000000000000000000000000000000000000000000000001d1a94a20000000000000000000000000000000000000000000000000000000d12f0c4c6000000000000000000000000000000000000000000000000000000084c946232000000000000000000000000000000000000000000000000000000000012a05f2000000000000000000000000000000000000000000000000000000000000000258000000000000000000000000000000000000000000000000c1f15b21947a3c9800000000000000000000000000000000000000000000000000000000000000074254432d4554480000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000074254432d45544800000000000000000000000000000000000000000000000000",
  "r": "0x606b3e9a9f49f6a99351367be0a46e176d4ea9c1b3fd6c4d3e831c8ba6fe8e9d",
  "s": "0x12ba1ab7f8be1988c5460ef9224dd1de302d5b9ef76258cac8698668fc1ea071",
  "v": 1,
  "creates": null,
  "chainId": 0
} -->