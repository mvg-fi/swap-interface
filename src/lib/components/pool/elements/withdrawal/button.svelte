<script lang="ts">
  import clsx from "clsx";
  import { _ } from "svelte-i18n";
  import { connected } from "$lib/stores/connect";
  import {
    poolsLoaded,
    withdrawError,
    withdrawApproved,
    exceptedLoading,
  } from "$lib/stores/pool/pools";
  import ConnectBtn from "$lib/components/pool/elements/connectBtn.svelte";
  import UnableBtn from "$lib/components/pool/elements/withdrawal/unableBtn.svelte";
  import ApproveBtn from "$lib/components/pool/elements/withdrawal/approveBtn.svelte";
  import WithdrawBtn from "$lib/components/pool/elements/withdrawal/withdrawBtn.svelte";
</script>

{#if !$connected}
  <ConnectBtn />
{:else if $exceptedLoading || $withdrawError || !$poolsLoaded}
  <UnableBtn />
{:else if $withdrawApproved}
  <WithdrawBtn />
{:else}
  <ApproveBtn />
{/if}
