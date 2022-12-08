<script lang="ts">
  import Copy from "$lib/images/copy.svg";
  import Copied from "$lib/images/check.svg";
  import Explore from "$lib/images/arrow-top-right.svg";
  import Quit from "$lib/images/power.svg";
  import { MVM_SCAN_URL } from "$lib/helpers/constants";
  import { address, logout } from "$lib/stores/user";
  import { providerKey } from "$lib/stores/provider";
  import { _ } from "svelte-i18n";

  const icons = [Copy, Explore, Quit];
  const justify = ["justify-end", "justify-center", "justify-start"];
  const tooltip = [$_("tooltip.copy"), $_("tooltip.explorer"), $_("tooltip.disconnect")]
  
  let copied = false;

  const action = (i: number) => {
    switch (i) {
      // Copy Address
      case 0:
        copied = true;
        setTimeout(()=>{ copied = false; }, 2000)
        navigator.clipboard.writeText($address);
        break;

      // Browser
      case 1:
        if ($providerKey === "mixinmessenger") {
          return;
        }
        window.open(`${MVM_SCAN_URL}address/${$address}`, "_blank");
        break;

      // Disconnect
      case 2:
        logout();
        break;
    }
  };
</script>

{#each icons as icon, i}
  <div class="flex items-center {justify[i]}">
    {#if i === 0}
      {#if copied}
        <div class="tooltip" data-tip={$_('tooltip.copied')}>
          <button
            on:click={() => action(i)}
            class="w-12 h-12 bg-gray-200 rounded-xl items-center justify-center flex"
          >
            <img src={Copied} alt="" class="w-4" />
          </button>
        </div>
      {:else}
        <div class="tooltip" data-tip={$_('tooltip.copy')}>
          <button
            on:click={() => action(i)}
            class="w-12 h-12 bg-gray-200 hover:bg-gray-300 rounded-xl items-center justify-center flex"
          >
            <img src={Copy} alt="" class="w-4" />
          </button>
        </div>
      {/if}
    {:else}
      <div class="tooltip" data-tip={$_(tooltip[i])}>
        <button
          on:click={() => action(i)}
          class="w-12 h-12 bg-gray-200 hover:bg-gray-300 rounded-xl items-center justify-center flex"
        >
          <img src={icon} alt="" class="w-4" />
        </button>
      </div>
    {/if}
  </div>
{/each}