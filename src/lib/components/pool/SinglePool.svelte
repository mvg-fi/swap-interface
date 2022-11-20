<script lang="ts">
  import _tokenList from "$lib/constants/tokenlist.json";
  import type { TokenLists } from "$lib/helpers/mvm-api";
  import { findIconsFromTokenList, shortenAddress } from "$lib/helpers/utils";
  import PoolIcon from "./PoolIcon.svelte";
  export let pool: IPoolData;

  interface IPoolData {
    name: string;
    full_name: string;
    symbol: string;
    reference_asset: string;
    swap_address: string;
    token_address: string;
    gauge_address?: string;
    deposit_address?: string;
    sCurveRewards_address?: string;
    reward_contract?: string;
    is_plain?: boolean;
    is_lending?: boolean;
    is_meta?: boolean;
    is_crypto?: boolean;
    is_fake?: boolean;
    is_factory?: boolean;
    base_pool?: string;
    underlying_coins: string[];
    wrapped_coins: string[];
    underlying_coin_addresses: string[];
    wrapped_coin_addresses: string[];
    underlying_decimals: number[];
    wrapped_decimals: number[];
    use_lending?: boolean[];
    swap_abi?: any;
    gauge_abi?: any;
    deposit_abi?: any;
    sCurveRewards_abi?: any;
  }

  const tokenlist = _tokenList as TokenLists;
  const logos = findIconsFromTokenList(
    tokenlist,
    pool.underlying_coin_addresses
  );
</script>

<tr class="hover">
  <!-- Icon and Name-->
  <td>
    <div class="flex items-center space-x-3">
      <div class="avatar">
        <div class="mask mask-squircle w-12 h-12">
          <PoolIcon {logos} />
        </div>
      </div>

      <div>
        <div class="font-bold">{pool.name}</div>
        {#each pool.underlying_coins as coin}
          <span class="text-sm opacity-60">
            {coin} &nbsp;
          </span>
        {/each}
        <div class="text-sm opacity-60">
          {shortenAddress(pool.swap_address)}
        </div>
      </div>
    </div>
  </td>

  <!-- APY -->
  <td> {"0.35"}% </td>

  <!-- TVL -->
  <td>${"0.5k"}</td>

  <!-- Volume -->
  <td>${"10k"} </td>
</tr>
