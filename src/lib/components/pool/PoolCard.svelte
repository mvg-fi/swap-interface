<script lang="ts">
  import PoolTable from "./PoolTable.svelte";
  import SearchPool from "./SearchPool.svelte";
</script>

<div class="card w-full flex flex-col pt-4 px-0 rounded-2xl bg-base-100">
  <div class="px-4">
    <SearchPool />
  </div>
  <div class="p-3 px-0">
    <PoolTable />
  </div>
</div>
