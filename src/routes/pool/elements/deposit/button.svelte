<script lang="ts">
  import { _ } from "svelte-i18n";
  const approved = false;
  const approve = async () => {
    console.log("Approve spending");
  };
</script>

{#if approved}
  <div>
    <button
      class="btn btn-block text-black bg-gray-200 hover:bg-gray-300 border-none rounded-2xl"
    >
      <span> {$_("add_liquidity.deposit")} </span>
    </button>
  </div>
{:else if !approved}
  <div>
    <button
      on:click={approve}
      class="btn btn-block text-black bg-gray-200 hover:bg-gray-300 border-none rounded-2xl"
    >
      <span> {$_("add_liquidity.approve")} </span>
    </button>
  </div>
{/if}
