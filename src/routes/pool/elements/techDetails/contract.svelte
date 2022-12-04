<script lang="ts">
  import { MVM_SCAN_URL } from "$lib/helpers/constants";
  import { shortenAddress } from "$lib/helpers/utils";
  import Link from "$lib/images/arrow-top-right.svg";
  import { fade } from "svelte/transition";
  import { _ } from "svelte-i18n";

  const coins = ["eth", "xin", "BTC", "SBF"];
  const poolBalance = [10000, 233.23432, 35121, 241224.123];
  const poolAddress = "0xA868A0342A94C354C4aC853F2957Bbd40d4b3e37";
  const tokenAddress = "0xA868A0342A94C354C4aC853F2957Bbd40d4b3e37";

  var addr_link = `${MVM_SCAN_URL}address/${poolAddress}`;
</script>

<div in:fade> 
  <div class="flex flex-row my-2 text-sm px-6">
    <div class="flex items-center mt-0.5 flex-1">
      <span class="font-semibold capitalize">
        {$_("technical.pool_address")}
      </span>
    </div>
    <a href={addr_link} target="_blank" rel="noreferrer" class="text-inherit">
      <div class="flex items-center mt-0.5 cursor-pointer">
        <span
          class="font-semibold text-base uppercase text-inherit hover:text-indigo-500"
        >
          {shortenAddress(poolAddress, 6, 4)}
        </span>
        <img
          src={Link}
          alt=""
          class="w-2.5 ml-1"
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
    <a href={addr_link} target="_blank" rel="noreferrer" class="text-inherit hover:text-indigo-500">
      <div class="flex items-center mt-0.5 cursor-pointer">
        <span
          class="font-semibold text-base uppercase text-inherit"
        >
          {shortenAddress(poolAddress, 6, 4)}
        </span>
        <img
          src={Link}
          alt=""
          class="w-2.5 ml-1"
        />
      </div>
    </a>
  </div>
</div>
