<script lang="ts">
  import { _ } from "svelte-i18n";
  import { MVM_SCAN_URL } from "$lib/helpers/constants";
  import { shortenAddress } from "$lib/helpers/utils";
  import Link from "$lib/images/arrow-top-right.svg";
  import { currentPool } from "$lib/stores/pool/pools";

  const poolAddress = $currentPool.address;
  const tokenAddress = $currentPool.lpToken;
</script>

<div> 
  <div class="flex flex-row my-2 text-sm px-6">
    <div class="flex items-center mt-0.5 flex-1">
      <span class="font-semibold capitalize">
        {$_("technical.pool_address")}
      </span>
    </div>
    <a href={`${MVM_SCAN_URL}address/${poolAddress}`} target="_blank" rel="noreferrer" class="text-inherit hover:text-indigo-600">
      <div class="flex items-center mt-0.5 cursor-pointer">
        <span
          class="font-semibold text-base uppercase text-inherit"
        >
          {shortenAddress(poolAddress, 6, 4)}
        </span>
        <img
          src={Link}
          alt=""
          class="w-2.5 ml-1 [[data-theme=dark]_&]:invert"
        />
      </div>
    </a>
  </div>

  <div class="flex flex-row my-2 text-sm px-6">
    <div class="flex items-center mt-0.5 flex-1">
      <span class="font-semibold capitalize">
        {$_("technical.token_address")}
      </span>
    </div>
    <a href={`${MVM_SCAN_URL}address/${tokenAddress}`} target="_blank" rel="noreferrer" class="text-inherit hover:text-indigo-600">
      <div class="flex items-center mt-0.5 cursor-pointer">
        <span
          class="font-semibold text-base uppercase text-inherit"
        >
          {shortenAddress(tokenAddress, 6, 4)}
        </span>
        <img
          src={Link}
          alt=""
          class="w-2.5 ml-1 [[data-theme=dark]_&]:invert"
        />
      </div>
    </a>
  </div>
</div>
