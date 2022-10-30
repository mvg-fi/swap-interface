<script lang="ts">
  import {MVMICON} from '$lib/helpers/constants'
  $: network = 'MVM'
</script>

<label for="" class="network btn btn-ghost modal-button mx-2">
  <div class="rounded-full mr-1">
    <img src="{MVMICON}" alt="-" class="mvm-logo"/>
  </div>
  <span class="mvm-text">
    {network}
  </span>
</label>

<style>
.mvm-logo{
  height: 20px;
}
.mvm-text {
  font-weight: 550;
}
</style>