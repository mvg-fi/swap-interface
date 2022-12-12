<script lang="ts">
    import PoolTable from "./PoolTable.svelte";
    import SearchPool from "./SearchPool.svelte";
    import { fade } from "svelte/transition";
</script>

<div class="card w-full flex flex-col p-4 rounded-2xl bg-base-100">
  <div>
    <SearchPool />
  </div>
  <div in:fade>
    <PoolTable />
  </div>
</div>