<script lang="ts">
  import { _ } from "svelte-i18n"
</script>

<div>
  <button class="btn rounded-3xl border-none bg-base-200 w-full btn-lg">
    <span class="text-base-content"> {$_('bridge.bridge')} </span>
  </button>
</div>