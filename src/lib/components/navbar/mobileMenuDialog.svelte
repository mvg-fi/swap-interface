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
          <!-- <input type="checkbox" class="toggle" bind:checked={dark} /> -->
          <label class="cursor-pointer grid place-items-center">
            <input type="checkbox" value="synthwave" class="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2" bind:checked={dark}/>
            <svg class="col-start-1 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
            <svg class="col-start-2 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
          </label>
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
