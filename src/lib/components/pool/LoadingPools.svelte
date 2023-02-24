<script lang="ts">
  import { _ } from "svelte-i18n";
  import loadingDark from '$lib/images/loading-rounded-dark.svg'
</script>

<div class="w-full py-8 flex flex-col items-center justify-center cursor-wait">
  <div>
    <img src={loadingDark} alt="loading" class="w-20 h-20 opacity-60 loading" />
  </div>

  <span class="text-base-content/50">
    {$_('pool.loading_pools')}
  </span>
</div>