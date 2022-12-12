<script lang="ts">
  import Account from "./details/account.svelte";
  import Buttons from "./details/buttons.svelte";
  import List from "./details/list.svelte";
</script>

<div class="card-body flex flex-col p-0">
  <div class="text-base-content flex flex-row text-start items-center p-3 pb-2">
    <Account />
  </div>
  <div>
    <List />
  </div>
  <div class="grid grid-cols-3 p-2 pt-3">
    <Buttons />
  </div>
</div>