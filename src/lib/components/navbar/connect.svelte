<script lang="ts">
  import { _ } from "svelte-i18n";
  const id = "connect-wallet";
</script>

<label for={id} class="connect btn modal-button mx-2 bg-black">
  {$_('connect.title')}
</label>

<style>
  .connect {
    border: none;
    border-radius: 1rem;
  }
  .btn {
    height: 48px;
    min-height: 48px !important;
  }
</style>
