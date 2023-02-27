<script lang="ts">
  import clsx from "clsx";
  import { _ } from "svelte-i18n";
  import { connected } from "$lib/stores/connect";
  import {
    currentPool,
    depositApproved,
    depositError,
    exceptedLoading,
    inputValues,
  } from "$lib/stores/pool/pools";
  import UnableBtn from "$lib/components/pool/elements/deposit/unableBtn.svelte";
  import ConnectBtn from "$lib/components/pool/elements/deposit/connectBtn.svelte";
  import ApproveBtn from "$lib/components/pool/elements/deposit/approveBtn.svelte";
  import DepositBtn from "$lib/components/pool/elements/deposit/depositBtn.svelte";

</script>

{#if !$connected}
  <ConnectBtn />
{:else if $exceptedLoading || $depositError}
  <UnableBtn />
{:else if $depositApproved}
  <DepositBtn />
{:else}
  <ApproveBtn />
{/if}
