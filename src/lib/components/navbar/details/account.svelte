<script lang="ts">
  import { providerLogo } from "$lib/stores/provider";
  import { shortAddress } from "$lib/stores/user";
</script>

<div class="flex-0">
  <img src={$providerLogo} alt="" class="w-12 h-12" />
</div>
<div class="flex-1 ml-4 text-lg">
  <span class="font-semibold"> {$shortAddress} </span>
</div>