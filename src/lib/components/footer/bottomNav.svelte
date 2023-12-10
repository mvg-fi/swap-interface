<script lang="ts">
  import clsx from "clsx";
  import { _ } from "svelte-i18n"
  import { page } from '$app/stores';  
  import { goto } from "$app/navigation";
  $: active = $page.url.pathname === '/swap' ? 0 : $page.url.pathname === '/pool' ? 1 : $page.url.pathname === '/me' ? 2 : 0;
</script>

<div class="btm-nav btm-nav-sm visible md:invisible bg-base-100">
  <button class={clsx("bg-transparent", active === 0 ? 'opacity-100' : 'opacity-40')} on:click={async ()=>await goto("/swap")}>
    <!-- Swap -->
    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M19.379 15.106A8.001 8.001 0 0 0 8.035 5.056l-.993-1.737a9.996 9.996 0 0 1 9.962.023c4.49 2.593 6.21 8.143 4.118 12.77l1.342.775l-4.166 2.214l-.165-4.714l1.246.719ZM4.629 8.9a8.001 8.001 0 0 0 11.345 10.05l.992 1.737a9.995 9.995 0 0 1-9.962-.024C2.514 18.07.794 12.52 2.887 7.893L1.545 7.12L5.71 4.905l.165 4.714l-1.245-.72Zm8.79 5.931l-2.829-2.828l-2.828 2.828l-1.415-1.414l4.243-4.243l2.828 2.829l2.829-2.829l1.414 1.414l-4.243 4.243Z"/></svg>
    <span class="btm-nav-label mtsub">{$_("swap.swap")}</span>
  </button>
  <button class={clsx("bg-transparent", active === 1 ? 'opacity-100' : 'opacity-40')} on:click={async ()=>await goto("/pool")}>
    <!-- Pool -->
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve">  <image id="image0" width="24" height="24" x="0" y="0" href="data:image/png;base64,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 b+owxAAAAABJRU5ErkJggg=="/><script xmlns=""/></svg>    <!-- <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> -->
    <span class="btm-nav-label mtsub">{$_("pool.title")}</span>
  </button>
  <button class={clsx("bg-transparent", active === 2 ? 'opacity-100' : 'opacity-40')} on:click={async ()=>await goto("/me")}>
    <!-- Me -->
    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
    <span class="btm-nav-label mtsub">{$_("me")}</span>
  </button>
</div>

<style>
  .mtsub{
    margin-top: -2px;
  }
</style>