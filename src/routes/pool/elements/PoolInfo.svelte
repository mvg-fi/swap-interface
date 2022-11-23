<script lang="ts">
  import Apy from "./poolInfo/apy.svelte";
  import Balances from "./poolInfo/balances.svelte";

  export let name: string;
</script>

<!-- Name -->
<div class="h-14 m-2 justify-center items-center flex shadow-none">
  <span class="font-bold text-2xl text-slate-600 capitalize">
    {name}
  </span>
</div>

<div class="card max-w-sm min-w-[28rem] w-64 h-auto bg-base-100 shadow-xl my-4">
  <Apy />
</div>

<div class="card max-w-sm min-w-[28rem] w-64 h-auto bg-base-100 shadow-xl py-4">
  <Balances />
</div>

<div>
  <div>
    <!-- Technical details -->
  </div>
</div>
