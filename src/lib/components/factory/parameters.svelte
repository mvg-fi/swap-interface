<script lang="ts">
  import { _ } from "svelte-i18n"
  import { poolType } from "$lib/stores/pool/factory";
  import PrevNext from "$lib/components/factory/prevNext.svelte";
  import PmStable from "$lib/components/factory/pmStable.svelte";
  import PmCrypto from "$lib/components/factory/pmCrypto.svelte";
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