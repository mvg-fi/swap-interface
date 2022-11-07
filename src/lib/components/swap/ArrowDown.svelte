<script lang="ts">
  import DownIcon from "$lib/images/down.svg";
  import { switchAsset } from "$lib/stores/swap";
</script>

<button on:click={switchAsset}>
  <img src={DownIcon} alt="s" class="down" />
</button>

<style>
  .down {
    opacity: 0.7;
    width: 20px;
  }
  .down:hover {
    opacity: 0.5;
    cursor: pointer;
    transform: rotate(-180deg);
    transition: transform 0.5s;
  }
  .down:not(:hover) {
    transform: rotate(0deg);
    transition: transform 0.5s;
  }
</style>
