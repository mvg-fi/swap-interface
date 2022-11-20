<script lang="ts">
    import PoolTable from "./PoolTable.svelte";
    import SearchPool from "./SearchPool.svelte";
</script>

<div class="card w-full flex flex-col p-4">
  <div>
    <SearchPool />
  </div>
  <div>
    <PoolTable />
  </div>
</div>