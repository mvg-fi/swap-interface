<script lang="ts">
  import { fromCoin, toCoin, payAmount} from "../stores/swap";
</script>

<div>
  <label class="input-group">
    <input type="text" placeholder="0" bind:value={$payAmount} class="input" />
    {#if $payAmount}
      <span class="mx-0 pr-0"> {$payAmount} </span>
    {/if}
    <span class="pl-3"> BTC</span>
  </label>
</div>

<label for="my-modal" class="btn modal-button">open modal</label>

<input type="checkbox" id="my-modal" class="modal-toggle" />
<div class="modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg">Congratulations random Internet user!</h3>
    <p class="py-4">
      You've been selected for a chance to get one year of subscription to use
      Wikipedia for free!
    </p>
    <div class="modal-action">
      <label for="my-modal" class="btn">Yay!</label>
    </div>
  </div>
</div>
