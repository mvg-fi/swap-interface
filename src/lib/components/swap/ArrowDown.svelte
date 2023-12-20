<script lang="ts">
  import DownIcon from "$lib/images/arrow-down.svg";
  import { switchAsset } from "$lib/stores/swap/swap";
</script>

<div class="flex justify-center items-center">
  <button
    on:click={switchAsset}
    class="bg-[rgb(247,248,250)] [[data-theme=dark]_&]:bg-[#000000] rounded-3xl p-1 border-base-100 border-2 absolute"
  >
    <img src={DownIcon} alt="s" class="down [[data-theme=dark]_&]:invert" />
  </button>
</div>

<style>
  .down {
    opacity: 0.7;
    width: 20px;
  }
  .down:hover {
    opacity: 0.5;
    cursor: pointer;
    transform: rotate(360deg);
    transition: transform 0.5s;
  }
  .down:not(:hover) {
    transform: rotate(0deg);
    transition: transform 0.5s;
  }
</style>
