<script>
    import { VERSION_NUMBER } from "$lib/helpers/constants";

  let l = ['My staking', 'History', 'Voting', 'DAO forum', 'Settings', 'Debug tools', 'Join community', 'About us', 'Log out']
</script>

<div class="mb-16">
  <div class="flex justify-center mt-2">
    <div class="card w-80 bg-base-100 shadow-xl mt-12">
      <div class="avatar absolute bottom-[50%] left-[50%] translate-x-[-50%] translate-y-[-15%]">
        <div class="w-24 rounded-full shadow-xl">
          <img src="https://mixin-images.zeromesh.net/7RKXjQPvFDSiTXVP4EMyEHK2xDPEcgBM0ZlY-ft_8FxWgmFCAhumR9dtX-BYfwAJ5KtfOF1AujmPbyFC6ZX1l2d_ELwynAgu2-0F=s256" />
        </div>
      </div>
      <div class="my-6 mt-16 text-center px-3">
        <h2 class="font-semibold text-xl truncate">Motherfucker</h2>
      </div>
    </div>
  </div>
  
  <div class="flex flex-col align-middle my-6 m-3">
    <button class="card w-80 bg-base-100 p-3 px-4 flex flex-row justify-between items-center">
      <span>
        My liquidity
      </span>
  
      <!-- chevron right -->
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </button>
  </div>
  
  <div class="join join-vertical ">
    {#each l as i}
      <div class="flex flex-col items-center m-3 my-0 join-item">
        <button class="w-80 bg-base-100 p-3 px-4 flex flex-row justify-between items-center">
          <span>
            {i}
          </span>
          <!-- chevron right -->
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    {/each}
  </div>
  
  <div class="flex flex-col items-center justify-center mt-14">
    <span class="text-sm opacity-25"> v{VERSION_NUMBER} </span>

    <span class="text-sm opacity-30 mt-2.5"> Made with ❤️ by MVG Finance </span>
  </div>
</div>