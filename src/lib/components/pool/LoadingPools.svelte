<script lang="ts">
  import { _ } from "svelte-i18n";
</script>

<div class="w-full py-8 flex flex-col items-center justify-center cursor-wait">
  <div>
    <div class="w-10 h-10 loading" />
  </div>

  <span class="text-base-content/50">
    {$_('pool.loading_pools')}
  </span>
</div>