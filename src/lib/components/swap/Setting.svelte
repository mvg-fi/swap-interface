<script lang="ts">
  import SettingIcon from "$lib/images/setting.svg";
  import { slippage } from "$lib/stores/swap";
  
  $: slip = 0;
  const realRanges = [0.1, 0.5, 1, 0]
  $: realValue = (slip:number) => {
    switch(slip){
      case 0:
        return realRanges[0]
      case 30:
        return realRanges[1]
      case 60:
        return realRanges[2]
      case 90:
        return realRanges[3]
      default:
        return realRanges[0]
    }
  }
  $: realSlippage = realValue(slip)
  
  const submit = (slip:number) => {
    console.log(slip)
    console.log(realValue(slip))
  }
</script>

<label for="swap-settings">
  <img src={SettingIcon} alt="s" class="setting" />
</label>

<input type="checkbox" id="swap-settings" class="modal-toggle" />
<div class="modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg pb-4">Slippage Setting</h3>

    <div class="pt-3">
      <input
        type="range"
        min="0"
        max="90"
        step="30"
        bind:value={slip}
        class="range"
      />
      <div class="w-full flex justify-between text-xs px-2">
        <span>{realRanges[0]}%</span>
        <span>{realRanges[1]}%</span>
        <span>{realRanges[2]}%</span>
        <span>Custom</span>
      </div>
    </div>
    <div class="pt-3">
      <input type="text" placeholder="Type here" bind:value={realSlippage} class="input input-bordered w-full" />
    </div>

    <div class="modal-action">
      <label for="swap-settings" class="btn" on:click={submit(slip)}>Save</label>
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
</style>
