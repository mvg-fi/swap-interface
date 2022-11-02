<script lang="ts">
  // import { LL } from "$i18n/i18n-svelte";

  const id = "connect-wallet";
</script>

<label for={id} class="connect btn modal-button mx-2">
  <!-- {$LL.connect.title} -->
  Connect
</label>

<style>
  .connect {
    border: none;
    border-radius: 1rem;
    background-color: red;
  }
  .btn {
    height: 48px;
    min-height: 48px !important;
  }
  .connect:hover {
    background-color: #db4d07 !important;
  }
</style>
