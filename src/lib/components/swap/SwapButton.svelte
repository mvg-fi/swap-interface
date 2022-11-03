<script lang="ts">
  import { _ } from "svelte-i18n";
  const id = "open-swap";
</script>

<label
  for={id}
  class="btn modal-button block flex content-center justify-center btn-lg rounded-2xl"
>
  {$_('swap.title')}
</label>

<input type="checkbox" id={id} class="modal-toggle" />