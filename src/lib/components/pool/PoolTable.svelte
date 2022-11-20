<script lang="ts">
  import { _ } from "svelte-i18n";
  import SinglePool from "./SinglePool.svelte";
  const pools = {
    stable: {
      name: "stable",
      full_name: "stable",
      symbol: "stable",
      reference_asset: "USD",

      swap_address: "0xbebc44782c7db0a1a60cb6fe97d0b483032ff1c7",
      token_address: "0x6c3f90f043a72fa612cbac8115ee7e52bde6e490",

      is_plain: true,
      underlying_coins: ["USDT-ERC20", "pUSD", "USDC", "USDT-TRC20"],
      wrapped_coins: ["USDT-ERC20", "pUSD", "USDC", "USDT-TRC20"],
      underlying_coin_addresses: [
        "0x59e0f2e9254db4d662ef36a02118ec5dbd9f8dfb",
        "0xa8090f6f19295321968b2f3bcdb44d20bb15742e",
        "0x07def5ad4e59ff1f64694fba1ba4e513a71e4a83",
        "0xac2ac36102f96f1fded2724f1d54b9fca6bbf1ee",
      ],
      wrapped_coin_addresses: [
        "0x59e0f2e9254db4d662ef36a02118ec5dbd9f8dfb",
        "0xa8090f6f19295321968b2f3bcdb44d20bb15742e",
        "0x07def5ad4e59ff1f64694fba1ba4e513a71e4a83",
        "0xac2ac36102f96f1fded2724f1d54b9fca6bbf1ee",
      ],
      underlying_decimals: [8, 8, 8, 8],
      wrapped_decimals: [8, 8, 8, 8],
    },
    stabletest: {
      name: "stabletest",
      full_name: "stabletest",
      symbol: "stabletest",
      reference_asset: "USD",
      swap_address: "0xF3F2ba723Da3BB6536CA9F2C5221Baf91247E5bE",
      token_address: "0x6498CFF660466eDbB9782245A4be75d4e88Aeff0",
      is_plain: true,
      underlying_coins: ["CNB", "SHIB", "AMITUO", "ONE"],
      wrapped_coins: ["CNB", "SHIB", "AMITUO", "ONE"],
      underlying_coin_addresses: [
        "0x910Fb1751B946C7D691905349eC5dD250EFBF40a",
        "0x12959642c33d4A3c4d1b4d68c88b5f50Ed223305",
        "0x95D78888886259693a877D64739c45946D541e78",
        "0x39028Df0a20426a0d724Ab1504A9a862FA40608a",
      ],
      wrapped_coin_addresses: [
        "0x910Fb1751B946C7D691905349eC5dD250EFBF40a",
        "0x12959642c33d4A3c4d1b4d68c88b5f50Ed223305",
        "0x95D78888886259693a877D64739c45946D541e78",
        "0x39028Df0a20426a0d724Ab1504A9a862FA40608a",
      ],
      underlying_decimals: [8, 8, 8, 8],
      wrapped_decimals: [8, 8, 8, 8],
    },
    tricrypto2: {
      name: "tricrypto2",
      full_name: "tricrypto2",
      symbol: "tricrypto2",
      reference_asset: "CRYPTO",
      swap_address: "0xD51a44d3FaE010294C616388b506AcdA1bfAAE46",
      token_address: "0xc4AD29ba4B3c580e6D59105FFf484999997675Ff",
      deposit_address: "0x3993d34e7e99Abf6B6f367309975d1360222D446",
      is_crypto: true,
      underlying_coins: ["USDT", "WBTC", "ETH"],
      wrapped_coins: ["USDT", "WBTC", "WETH"],
      underlying_coin_addresses: [
        "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
        "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
      ],
      wrapped_coin_addresses: [
        "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
        "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      ],
      underlying_decimals: [6, 8, 18],
      wrapped_decimals: [6, 8, 18],
    },
  };
</script>

<div class="mt-3">
  <div class="overflow-x-auto w-full">
    <table class="table w-full sortable">
      <thead>
        <tr class="">
          <th>{$_("pooltable.name")}</th>
          <th>{$_("pooltable.apy")}</th>
          <th>{$_("pooltable.tvl")}</th>
          <th>{$_("pooltable.volume")}</th>
        </tr>
      </thead>
      <tbody>
        {#each Object.values(pools) as v}
          <SinglePool value={v}/>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<style>
  .table :where(thead, tfoot) :where(th, td) {
    background-color: transparent;
    text-transform: none !important;
  }
</style>
