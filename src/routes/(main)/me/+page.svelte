<script>
  import { _ } from "svelte-i18n"
  import { VERSION_NUMBER } from "$lib/helpers/constants";

  let l0 = [$_('pool.myLiquidity'), $_('pool.myStaking'), $_('history')]
  let l1 = [$_('voting'), $_('dao_forum')]
  let l2 = [$_('settings'), $_('debug_tools'), $_('join_community'), $_('about_us')]
  let l3 = [ $_('log_out')]
</script>

<div class="mb-16">
  <div class="flex justify-center mt-2">
    <div class="card w-full bg-base-100 shadow-xl mt-12">
      <div class="avatar absolute bottom-[50%] left-[50%] translate-x-[-50%] translate-y-[-15%]">
        <div class="w-24 rounded-full shadow-xl">
          <img src="https://mixin-images.zeromesh.net/7RKXjQPvFDSiTXVP4EMyEHK2xDPEcgBM0ZlY-ft_8FxWgmFCAhumR9dtX-BYfwAJ5KtfOF1AujmPbyFC6ZX1l2d_ELwynAgu2-0F=s256" alt="" />
        </div>
      </div>
      <div class="my-6 mt-16 text-center px-3">
        <h2 class="font-semibold text-xl truncate">Motherfucker</h2>
      </div>
    </div>
  </div>
  
  <div class="flex flex-col items-center justify-center mt-6">
    {#each l0 as i}      
      <button class="w-full bg-base-100 p-3 px-4 flex flex-row justify-between items-center first:rounded-t-2xl last:rounded-b-2xl">
        <span>
          {i}
        </span>
        <!-- chevron right -->
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    {/each}
  </div>

  <div class="flex flex-col items-center justify-center mt-4">
    {#each l1 as i}      
      <button class="w-full bg-base-100 p-3 px-4 flex flex-row justify-between items-center first:rounded-t-2xl last:rounded-b-2xl">
        <span>
          {i}
        </span>
        <!-- chevron right -->
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    {/each}
  </div>

  <div class="flex flex-col items-center justify-center mt-4">
    {#each l2 as i}      
      <button class="w-full bg-base-100 p-3 px-4 flex flex-row justify-between items-center first:rounded-t-2xl last:rounded-b-2xl">
        <span>
          {i}
        </span>
        <!-- chevron right -->
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    {/each}
  </div>

  <div class="flex flex-col items-center justify-center mt-4">
    {#each l3 as i}      
      <button class="w-full bg-base-100 p-3 px-4 flex flex-row justify-between items-center first:rounded-t-2xl last:rounded-b-2xl">
        <span>
          {i}
        </span>
        <!-- log out -->
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-log-out w-4 h-4"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
      </button>
    {/each}
  </div>
  
  <div class="flex flex-col items-center justify-center mt-14">
    <span class="text-sm opacity-25"> v{VERSION_NUMBER} </span>

    <span class="text-sm opacity-30 mt-2.5"> Made with ❤️ by MVG Finance </span>
  </div>
</div>