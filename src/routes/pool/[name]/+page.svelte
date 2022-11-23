<script lang="ts">
  import { page } from "$app/stores";
  import Deposit from "../elements/Deposit.svelte";
  import PoolInfo from "../elements/PoolInfo.svelte";

  console.log($page.params.name);
</script>

<div class="mx-0 flex flex-row">
  <div class="mr-4">
    <PoolInfo name={$page.params.name}/>
  </div>
  <div class="sticky">
    <Deposit />
  </div>
</div>
