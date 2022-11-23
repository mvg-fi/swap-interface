<script lang="ts">
  import { _ } from "svelte-i18n";
  import Refresh from "$lib/images/refresh.svg";

  const switchToWithdraw = () => {
    console.log('TODO, switch to withdraw')
  }
</script>

<div class="flex text-center justify-center mx-3">
  <span class="font-bold text-base"> {$_("add_liquidity.deposit")} </span>
  <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <img
    alt=""
    tabindex="0"
    src={Refresh}
    on:click={()=>switchToWithdraw()}
    class="w-2.5 ml-2 mb-0.5 cursor-pointer"
  />
</div>

<style>
  img:focus {
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
