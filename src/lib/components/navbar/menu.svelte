<script lang="ts">
  import menu from "$lib/images/menu.svg";

  let isDropdownOpen = false;

  const handleDropdownClick = () => {
    isDropdownOpen = !isDropdownOpen;
  };

  const handleDropdownFocusLost = ({ relatedTarget, currentTarget }:any) => {
    if (
      relatedTarget instanceof HTMLElement &&
      currentTarget.contains(relatedTarget)
    )
      return;
    isDropdownOpen = false;
  };
</script>

<div class="dropdown dropdown-end" on:focusout={handleDropdownFocusLost}>
  <button tabindex="0" class="btn btn-square btn-ghost menu-btn" on:click={handleDropdownClick}>
    <img src={menu} alt="menu" />
  </button>
  <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
  <ul
    tabindex="0"
    style:visibility={isDropdownOpen ? 'visible' : 'hidden'}
    class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mt-3"
  >
    <!-- svelte-ignore a11y-missing-attribute -->
    <li><a>Item 1</a></li>
    <!-- svelte-ignore a11y-missing-attribute -->
    <li><a>Item 2</a></li>
  </ul>
</div>

<style>
  /* .menu-btn{

  } */
</style>