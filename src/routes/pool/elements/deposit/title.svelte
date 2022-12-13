<script lang="ts">
  import { _ } from "svelte-i18n";
  import Refresh from "$lib/images/refresh.svg";
  import { setDepositMode } from "$lib/stores/pool/mode";

  const switchToWithdraw = () => {
    setDepositMode(false);
  };
</script>

<div class="flex text-center justify-center mx-3">
  <span class="font-bold text-base"> {$_("add_liquidity.deposit")} </span>
  <button on:click={() => switchToWithdraw()}>
    <img
      alt=""
      src={Refresh}
      class="w-2.5 ml-2 mb-0.5 cursor-pointer [[data-theme=dark]_&]:invert"
    />
  </button>
</div>

<style>
  img:hover {
    animation: shake 1s;
    animation-iteration-count: 1;
  }

  @keyframes shake {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(360deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
