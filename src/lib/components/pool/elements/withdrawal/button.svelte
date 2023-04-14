<script lang="ts">
  import { _ } from "svelte-i18n";
  import { connected } from "$lib/stores/connect";
  import {
    poolsLoaded,
    withdrawError,
    withdrawApproved,
    exceptedLoading,
    inputLpAmount,
  } from "$lib/stores/pool/pools";
  import ConnectBtn from "$lib/components/pool/elements/connectBtn.svelte";
  import LoadingBtn from "$lib/components/pool/elements/loadingPoolsBtn.svelte";
  import UnableBtn from "$lib/components/pool/elements/withdrawal/unableBtn.svelte";
  import ApproveBtn from "$lib/components/pool/elements/withdrawal/approveBtn.svelte";
  import WithdrawBtn from "$lib/components/pool/elements/withdrawal/withdrawBtn.svelte";
  
</script>

{#if !$connected}
  <ConnectBtn />
{:else if !$poolsLoaded}
  <LoadingBtn />
{:else if $exceptedLoading || $withdrawError || ($inputLpAmount==null||$inputLpAmount==0)}
  <UnableBtn />
{:else if $withdrawApproved}
  <WithdrawBtn />
{:else}
  <ApproveBtn />
{/if}
