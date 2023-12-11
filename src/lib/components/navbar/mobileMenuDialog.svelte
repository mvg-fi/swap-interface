<script lang="ts">
  import { _ } from "svelte-i18n";
  import { themeChange } from "theme-change";
  $: dark = false;
  $: items = [
    { key: $_("dark_mode"), value: "", check: true, func: ()=>{themeChange(true)} },
    { key: $_("language"), value: "", check: false, func: ()=>{} },
    { key: $_("currency"), value: "", check: false, func: ()=>{} },
    { key: $_("about_us"), value: "", check: false, func: ()=>{} },
  ];
</script>

<dialog id="mobile_menu_dialog" class="modal modal-bottom sm:modal-middle">
  <div class="modal-box">
    <h3 class="font-bold text-lg mb-4">Settings</h3>
    {#each items as { key, check, func }}
      <button class="w-full flex items-center justify-between" on:click={()=>func()}>
        <span class="py-2 font-medium">{key}</span>
        {#if check}
          <input type="checkbox" class="toggle" bind:checked={dark} />
        {:else}
          <!-- chevron right -->
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>        
        {/if}
        </button>
    {/each}
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
