<script lang="ts">
  import { page } from "$app/stores";
  import Deposit from "../elements/Deposit.svelte";

  console.log($page.params.name);
</script>

<div>
  <Deposit />
</div>
