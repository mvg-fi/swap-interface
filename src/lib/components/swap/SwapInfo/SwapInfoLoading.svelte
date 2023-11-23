<script lang="ts">
  import { _ } from "svelte-i18n";
</script>

<div class="flex items-center space-x-2">
  <button class="btn btn-square bg-base-100 border-none mx-2 w-4 h-4"> 
    <span class="loading loading-spinner"></span>
  </button>
  <span class="text-base-content opacity-50"> {$_("swap.loading")} </span>
</div>

<style>
  .btn.loading::before {
    animation: spin 1s ease-in-out infinite;
    color: black;
  }
</style>
