<script lang="ts">
  import Title from "./poolInfo/title.svelte";
  import Apy from "./poolInfo/apy.svelte";
  import Balances from "./poolInfo/balances.svelte";
  import TechDetails from "./TechDetails.svelte";
</script>

<!-- Name -->
<!-- <div class="w-full flex items-center justify-center py-3">
  <Title />
</div> -->

<div class="card min-w-[32rem] h-auto bg-base-100 shadow-lg mb-2">
  <Apy />
</div>

<div class="card min-w-[32rem] h-auto bg-base-100 shadow-xl py-4 my-2">
  <Balances />
</div>

<div class="card border border-base-300 bg-base-100 rounded-box shadow-md">
  <TechDetails />
</div>