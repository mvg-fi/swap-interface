<script lang="ts">
  import clsx from "clsx";
  import { _ } from "svelte-i18n"
  import { page } from '$app/stores';  
    import { goto } from "$app/navigation";
  $: active = $page.url.pathname === '/swap' ? 0 : $page.url.pathname === '/pool' ? 1 : $page.url.pathname === '/me' ? 2 : 0;
</script>

<div class="btm-nav btm-nav-sm bg-base-100">
  <button class={clsx("bg-transparent", active === 0 ? 'opacity-100' : 'opacity-40')} on:click={async ()=>await goto("/swap")}>
    <!-- Swap -->
    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M19.379 15.106A8.001 8.001 0 0 0 8.035 5.056l-.993-1.737a9.996 9.996 0 0 1 9.962.023c4.49 2.593 6.21 8.143 4.118 12.77l1.342.775l-4.166 2.214l-.165-4.714l1.246.719ZM4.629 8.9a8.001 8.001 0 0 0 11.345 10.05l.992 1.737a9.995 9.995 0 0 1-9.962-.024C2.514 18.07.794 12.52 2.887 7.893L1.545 7.12L5.71 4.905l.165 4.714l-1.245-.72Zm8.79 5.931l-2.829-2.828l-2.828 2.828l-1.415-1.414l4.243-4.243l2.828 2.829l2.829-2.829l1.414 1.414l-4.243 4.243Z"/></svg>
    <span class="btm-nav-label">{$_("swap.swap")}</span>
  </button>
  <button class={clsx("bg-transparent", active === 1 ? 'opacity-100' : 'opacity-40')} on:click={async ()=>await goto("/pool")}>
    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    <span class="btm-nav-label">{$_("pool.title")}</span>
  </button>
  <button class={clsx("bg-transparent", active === 2 ? 'opacity-100' : 'opacity-40')} on:click={async ()=>await goto("/me")}>
    <!-- Me -->
    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
    <span class="btm-nav-label">{$_("me")}</span>
  </button>
</div>