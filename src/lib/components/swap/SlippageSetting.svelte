<script lang="ts">
  import { onDestroy } from "svelte";
  import Close from "$lib/images/close.svg";
  import SettingIcon from "$lib/images/setting.svg";
  import { slippage, setSlippage } from "$lib/stores/swap";

  const ranges = [0.1, 0.5, 1];
  let slipValue: number;
  $: valid = slipValue >= 0 && slipValue <= 50
  const unsub = slippage.subscribe((value) => (slipValue = value));
  onDestroy(unsub);
</script>

<label for="swap-settings">
  <img src={SettingIcon} alt="s" class="setting" />
</label>

<input type="checkbox" id="swap-settings" class="modal-toggle" />
<div class="modal modal-bottom sm:modal-middle">
  <div class="modal-box">
    <div class="flex mb-4">
      <h3 class="font-bold text-lg text-black flex-1 content-center">
        Slippage Setting
      </h3>
      <label for="swap-settings" class="flex-0 btn btn-xs btn-circle btn-ghost">
        <img src={Close} alt="x" />
      </label>
    </div>

    <div class="mb-3">
      <div class="my-5 btn-group grid grid-cols-4">
        <button
          class="btn btn-sm custom-btn bg-color font-medium text-xs {slipValue ===
          ranges[0]
            ? 'black-btn'
            : ''}"
          on:click={() => setSlippage(ranges[0])}>{ranges[0]}%</button
        >
        <button
          class="btn btn-sm custom-btn bg-color font-medium text-xs {slipValue ===
          ranges[1]
            ? 'black-btn'
            : ''}"
          on:click={() => setSlippage(ranges[1])}>{ranges[1]}%</button
        >
        <button
          class="btn btn-sm custom-btn bg-color font-medium text-xs {slipValue ===
          ranges[2]
            ? 'black-btn'
            : ''}"
          on:click={() => setSlippage(ranges[2])}>{ranges[2]}%</button
        >
        <button
          class="btn btn-sm custom-btn bg-color font-medium text-xs {!ranges.includes(
            slipValue
          )
            ? 'black-btn'
            : ''}"
          on:click={() => setSlippage(0)}>Custom</button
        >
      </div>

      <div class="form-control">
        <div class="input-group">
          <input
            type="text"
            placeholder="Type here"
            bind:value={$slippage}
            class="input input-bordered w-full bg-color no-outline no-border"
          />
          <button class="btn btn-square custom-btn btn-disabled bg-color">
            %
          </button>
        </div>
      </div>
    </div>

    <div class="w-full flex justify-center content-center pt-5">
      <label for="swap-settings" class="btn rounded-3xl {valid ?'black-btn':'btn-disabled'}">Save</label>
    </div>
  </div>
</div>

<style>
  .setting {
    width: 20px;
    opacity: 0.8;
  }
  .setting:hover {
    opacity: 0.5;
    cursor: pointer;
    transform: rotate(40deg);
    transition: transform 0.5s;
  }
  .setting:not(:hover) {
    transform: rotate(-40deg);
    transition: transform 0.6s;
  }
  .custom-btn {
    color: black;
    border: none;
  }
  .bg-color {
    background-color: #f5f5f5;
  }
  .no-outline {
    outline: none !important;
  }
  .no-border {
    border: none;
  }
  .black-btn {
    color: white;
    background-color: black;
  }
</style>