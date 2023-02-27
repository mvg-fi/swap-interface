<script lang="ts">
  import { _ } from "svelte-i18n";
  import { depositErrorMsg } from "$lib/stores/pool/pools";
</script>

<div class="alert bg-red-400 border border-red-300 p-3 py-2 items-center">
  <div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="stroke-base-100 flex-shrink-0 h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      ><path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      /></svg
    >
    <span class="text-base-100 text-sm break-all font-semibold">{$depositErrorMsg}</span>
  </div>
</div>
