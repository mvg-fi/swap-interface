<script lang="ts">
	import { _ } from "svelte-i18n";
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";
	import Main from "$lib/components/hero/main.svelte";

	// onMount(() => {
	// 	goto("/swap");
	// });
</script>

<svelte:head>
	<title>{`${$_("appName")} - ${$_("appIntro")}`}</title>
	<meta name="description" content="" />
</svelte:head>

<div>
	<div class="bg-white h">
		<div class="relative isolate px-6 pt-14 lg:px-8 dyh mb-[4rem]">
			<div
				class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
				aria-hidden="true"
			>
				<div
					class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#80ffea] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
					style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
				></div>
			</div>
			<div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
				<div class="text-center">
					<h1
						style="font-family:Ubuntu"
						class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
					>
						MVG Swap
					</h1>

					<!-- <h1 class="text-5xl font-extrabold text-center lg:text-7xl 2xl:text-8xl" style="font-family:Ubuntu">
						<span class="text-transparent bg-gradient-to-br bg-clip-text from-teal-500 via-indigo-500 to-sky-500 dark:from-teal-200 dark:via-indigo-300 dark:to-sky-500">
								MVG
						</span>

						<span class="text-transparent bg-gradient-to-tr bg-clip-text from-blue-500 via-pink-500 to-red-500 dark:from-sky-300 dark:via-pink-300 dark:to-red-500">
								Swap
						</span>
					</h1> -->
					<p
						class="mt-6 text-lg leading-8 text-gray-600"
						style="font-family:Ubuntu"
					>
						The most capital efficient decentralized exchange on Mixin Virtual
						Machine.
					</p>
					<div class="mt-10 flex items-center justify-center gap-x-6">
						<button
							class="btn btn-primary btn-sm px-3.5 text-sm transition font-semibold text-white shadow-sm rounded-3xl"
							on:click={() => {
								goto("/swap");
							}}>{$_("enter_app")}</button
						>
						<button class="text-sm font-semibold leading-6 text-gray-900"
							>Learn more <span aria-hidden="true">→</span></button
						>
					</div>
				</div>
			</div>
			<div
				class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
				aria-hidden="true"
			>
				<div
					class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#80ffea] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
					style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
				></div>
			</div>
		</div>
	</div>
</div>

<style>
	.heros {
		background-color: white !important;
		background-image: none !important;
	}
	.h {
		/* background-color:#e099ff;
		background-image:
		radial-gradient(at 21% 36%, hsla(89,67%,67%,1) 0px, transparent 50%),
		radial-gradient(at 11% 56%, hsla(357,99%,76%,1) 0px, transparent 50%),
		radial-gradient(at 88% 78%, hsla(162,84%,76%,1) 0px, transparent 50%),
		radial-gradient(at 1% 52%, hsla(182,92%,78%,1) 0px, transparent 50%),
		radial-gradient(at 2% 26%, hsla(298,76%,76%,1) 0px, transparent 50%),
		radial-gradient(at 36% 47%, hsla(190,71%,76%,1) 0px, transparent 50%),
		radial-gradient(at 98% 49%, hsla(81,96%,73%,1) 0px, transparent 50%); */
	}
	.dyh {
		height: calc(100vh - 8rem);
	}
</style>
