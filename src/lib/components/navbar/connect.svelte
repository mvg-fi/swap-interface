<script lang="ts">
  import { LL } from "$i18n/i18n-svelte";
</script>

<button class="connect btn modal-button mx-2"> {$LL.connect.title} </button>

<style>
  .connect {
    border: none;
    border-radius: 1rem;
    background-color: red;
  }
  .btn {
    height: 40px;
    min-height: 40px !important;
  }
  .connect:hover {
    background-color: #db4d07 !important;
  }
</style>
