<script lang="ts">
  import { _ } from "svelte-i18n";
</script>

<div>
  <button
    class="btn loading btn-lg btn-block bg-gray-200 hover:bg-gray-300 border-none rounded-2xl"
  >
    <span> {$_("pool.loading_pools")} </span>
  </button>
</div>