<script lang="ts">
  import chevronUp from "$lib/images/chevron-up.svg";
  import chevronDown from "$lib/images/chevron-down.svg";
  import { providerLogo } from "$lib/stores/provider";
  import { shortAddress } from "$lib/stores/user";
  import Details from "./details.svelte";

  let isDropdownOpen = false;

  const handleDropdownClick = () => {
    isDropdownOpen = !isDropdownOpen;
  };

  const handleDropdownFocusLost = ({ relatedTarget, currentTarget }: any) => {
    if (
      relatedTarget instanceof HTMLElement &&
      currentTarget.contains(relatedTarget)
    )
      return;
    isDropdownOpen = false;
  };
</script>

<div
  class="dropdown dropdown-bottom dropdown-end"
  on:focusout={handleDropdownFocusLost}
>
  <button
    class="btn mx-1 rounded-2xl bg-transparent text-black border-none account-btn flex"
    on:click={handleDropdownClick}
  >
    <img
      src={$providerLogo}
      alt=""
      class="mr-3 mb-0.5 md:h-5 md:w-5 items-center"
      width="14px"
    />
    <span class="font-semibold text-sm text-ellipsis">
      {$shortAddress ? $shortAddress : "Account"}
    </span>
    <img
      src={isDropdownOpen ? chevronUp : chevronDown}
      alt=""
      class="ml-1 mb-0.5 items-center"
      width="14px"
    />
  </button>
  <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
  <div
    tabindex="0"
    style:visibility={isDropdownOpen ? "visible" : ""} 
    class="dropdown-content card card-compact w-80 p-2 shadow bg-white text-primary-content mt-3"
  >
  <!-- hidden -->
    <Details />
  </div>
</div>

<style>
  .account-btn {
    border: 1px solid transparent;
  }
  .account-btn:hover,
  .account-btn:focus {
    background-color: #ccdee6 !important;
    border: 1px solid rgb(167, 177, 212);
  }
</style>
