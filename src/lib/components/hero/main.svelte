<script>
  import { _ } from "svelte-i18n";
	import { goto } from "$app/navigation";
</script>

<div class="bg-base-100 w-full ">
  <div class="relative isolate px-6 pt-14 lg:px-8 dyh mb-[4rem]">
    <div
      class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 rotate-transition"
      aria-hidden="true"
    >
      <div
        class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#80ffea] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
      ></div>
    </div>
    <div class="mx-auto max-w-2xl h-full flex justify-center items-center py-48 lg:py-56">
      <div class="text-center ubuntu">
        <h1 class="text-5xl font-extrabold text-center md:text-5xl lg:text-7xl 2xl:text-8xl">
          <span class="text-transparent bg-gradient-to-br bg-clip-text from-teal-500 via-indigo-500 to-sky-500 dark:from-teal-200 dark:via-indigo-300 dark:to-sky-500">
              MVG
          </span>

          <span class="text-transparent bg-gradient-to-tr bg-clip-text from-blue-500 via-fuchsia-500 to-rose-500 dark:from-sky-300 dark:via-pink-300 dark:to-red-500">
              Swap
          </span>
        </h1>
        <p
          class="mt-6 text-lg leading-8 text-gray-600"
          
        >
          {$_('main_t')}
        </p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <button
            class="btn btn-primary btn-sm md:btn-md flex items-center pl-4 pr-3 text-sm transition font-semibold text-white shadow-sm rounded-3xl"
            on:click={() => {
              goto("/swap");
            }}>
            <span>{$_("enter_app")}</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3 h-3 px-0">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>							
          </button>
          <a href="#efficient" class=""><button class="text-sm font-semibold leading-6 text-base-content"
            >{$_('learn_more')} <span aria-hidden="true">→</span></button
          >
          </a>
        </div>
      </div>
    </div>
    <div
      class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      aria-hidden="true"
    >
      <div
        class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#80ffea] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem] rotate-transition"
        style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
      ></div>
    </div>
  </div>
</div>

<style>
  .dyh {
		height: calc(100vh - 8rem);
	}
  /* .rotate-transition {
    animation: rotate 200s linear infinite;
  }
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(90deg);
    }
    50% {
      transform: rotate(180deg);
    }
    75% {
      transform: rotate(270deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes translate {
    0% {
      transform: translate(0);
    }
    10% {
      transform: rotate(90deg);
    }
    25% {
      transform: translate(50vh, 50vh);
    }
    30% {
      transform: rotate(180deg);
    }
    50% {
      transform: translate(100vh, 100vh);
    }
    60% {
      transform: rotate(270deg);
    }
    75% {
      transform: translate(50vh, 50vh);
    }
    85% {
      transform: rotate(360deg);
    }
    100% {
      transform: translate(0vh, 0vh);
    }
  } */
</style>