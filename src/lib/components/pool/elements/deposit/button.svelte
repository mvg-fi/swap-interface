<script lang="ts">
  import { _ } from "svelte-i18n";
  import { connected } from "$lib/stores/connect";
  import {
    poolsLoaded,
    depositError,
    depositApproved,
    exceptedLoading,
    inputValues,
  } from "$lib/stores/pool/pools";
  import { arrayAreAllNull } from "$lib/helpers/utils";
  import ConnectBtn from "$lib/components/pool/elements/connectBtn.svelte";
  import LoadingBtn from "$lib/components/pool/elements/loadingPoolsBtn.svelte";
  import UnableBtn from "$lib/components/pool/elements/deposit/unableBtn.svelte";
  import ApproveBtn from "$lib/components/pool/elements/deposit/approveBtn.svelte";
  import DepositBtn from "$lib/components/pool/elements/deposit/depositBtn.svelte";

</script>

{#if !$connected}
  <ConnectBtn />
{:else if !$poolsLoaded}
  <LoadingBtn />
{:else if $exceptedLoading || $depositError || arrayAreAllNull($inputValues)}
  <UnableBtn />
{:else if $depositApproved}
  <DepositBtn />
{:else}
  <ApproveBtn />
{/if}
