<script lang="ts">
  export let wallet: object;
</script>

{#if wallet}
  <button class="btn-ghost h-14">
    {#if wallet.logo}
      <div class="avatar pr-1">
        <div class="mask mask-squircle w-10 h-10">
          <img src={wallet.logo} alt="logo" />
        </div>
      </div>
      <div class="text-left pl-0">
        <div class="font-bold">{wallet.name}</div>
      </div>
    {/if}
    <div />
  </button>
{/if}