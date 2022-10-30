<script lang="ts">
  import Close from "$lib/images/close.svg";
  import { WALLETS as wallets } from "$lib/helpers/constants"
  import SingleWallet from "$lib/components/wallets/SingleWallet.svelte";

  export let id: string;
  // placeholder
</script>

<div class="modal modal-bottom sm:modal-middle">
  <div class="modal-box relative h-4/5 p-0">
    <div class="flex p-5">
      <h3 class="font-bold text-lg flex-1">Connect a wallet</h3>
      <label for={id} class="flex-0 btn btn-xs btn-circle btn-ghost">
        <img src={Close} alt="x" />
      </label>
    </div>
    <ul class="menu bg-base-100 w-full">
      {#each wallets as wallet}
        <li>
          <SingleWallet {wallet} />
        </li>
      {/each}
    </ul>
  </div>
</div>

<style>
</style>
