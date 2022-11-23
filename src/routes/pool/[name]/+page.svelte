<script lang="ts">
  import { page } from "$app/stores";
  import Deposit from "../elements/Deposit.svelte";
  import PoolInfo from "../elements/PoolInfo.svelte";

  console.log($page.params.name);
</script>

<div>
  <Deposit />
  <PoolInfo />
</div>
