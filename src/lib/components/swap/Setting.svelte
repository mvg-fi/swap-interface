<script lang="ts">
  import SettingIcon from "$lib/images/setting.svg";
</script>

<label for="swap-settings">
  <img src={SettingIcon} alt="s" class="setting" />
</label>

<input type="checkbox" id="swap-settings" class="modal-toggle" />
<div class="modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg">Settings</h3>
    <div>
      <p class="py-3"> Slippage </p>
    </div>

    <div class="modal-action">
      <label for="swap-settings" class="btn">Save</label>
    </div>
  </div>
</div>

<style>
  .setting {
    width: 20px;
    opacity: 0.8;
  }
  .setting:hover{
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