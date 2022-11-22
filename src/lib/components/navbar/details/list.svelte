<script lang="ts">
  import { _ } from "svelte-i18n";
  import { BRIDGE_URL } from "$lib/helpers/constants";
  import ChevronRight from "$lib/images/chevron-right.svg";
</script>

<ul class="menu bg-base-100 text-slate-500 p-1 rounded-box">
  <li>
    <a class="p-3 flex flex-row hover:text-black" href={BRIDGE_URL} target="_blank" rel="noreferrer">
      <span class="flex-1"> {$_('account.detail.depositmvm')} </span>
      <img src={ChevronRight} class="w-3" alt="" />
    </a>
  </li>
  <!-- svelte-ignore a11y-missing-attribute -->
  <!-- TODO (Implement transation sub page) -->
  <li>
    <a class="p-3 flex flex-row hover:text-black">
      <span class="flex-1"> {$_('account.detail.transactions')} </span>
      <img src={ChevronRight} class="w-3" alt="" />
    </a>
  </li>
</ul>