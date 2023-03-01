<script lang="ts">
  import { page } from "$app/stores";
  import { APP_PATHS, MVM_ICON } from "$lib/helpers/constants";
  const network = "MVM";
  
  if ([APP_PATHS[0],APP_PATHS[1]].includes($page.url.pathname)){ }
  // TODO: check network after connected, in /swap and /pool
</script>

<div class="network btn btn-ghost modal-button mx-2">
  <div class="rounded-full mr-2 mb-0.5">
    <img src={MVM_ICON} alt="mvm" class="mvm-logo" />
  </div>
  <span class="mvm-text">
    {network}
  </span>
</div>

<!-- 
  1. If pay network is evm compatible, then switch and check the network. else, do nothing.
  2. check balance, check 
-->

<style>
  .mvm-logo {
    height: 20px;
  }
  .mvm-text {
    font-weight: 600;
  }
</style>
