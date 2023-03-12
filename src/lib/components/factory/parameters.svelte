<script lang="ts">
  import clsx from "clsx"
  import { _ } from "svelte-i18n"
  import { poolTokenAddresses, poolType } from "$lib/stores/pool/factory";
  import PrevNext from "./prevNext.svelte";
  import PmStable from "./pmStable.svelte";
  import PmCrypto from "./pmCrypto.svelte";
  
</script>

<div class="flex flex-col space-y-6 px-40">
  {#if $poolType === 1}
    <PmStable/>
  {:else if $poolType === 2}
    <PmCrypto />
  {/if}
  <div class="pt-8">
    <PrevNext />
  </div>
</div>