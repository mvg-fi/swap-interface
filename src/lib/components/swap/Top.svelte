<script lang="ts">
  import SlippageSetting from "./SlippageSetting.svelte";
  import { _ } from "svelte-i18n";
</script>

<span class="font-medium flex-1 text-base-content"> 
  {$_('swap.title')} 
</span>
<div class="flex-0">
  <SlippageSetting />
</div>