<script lang="ts">
  import { _ } from "svelte-i18n";
  import menu from "$lib/images/menu.svg";
  import doc from "$lib/images/document.svg";
  let isDropdownOpen = false;

  const handleDropdownClick = () => {
    isDropdownOpen = !isDropdownOpen;
  };
  const items = [
    { img: doc, text: $_("navbar.view_doc") }, 
    { img: doc, text: $_("navbar.help_center") },
  ];

  const handleDropdownFocusLost = ({ relatedTarget, currentTarget }: any) => {
    if (
      relatedTarget instanceof HTMLElement &&
      currentTarget.contains(relatedTarget)
    )
      return;
    isDropdownOpen = false;
  };
</script>

<div class="dropdown dropdown-end" on:focusout={handleDropdownFocusLost}>
  <button
    tabindex="0"
    class="btn btn-square btn-ghost [[data-theme=dark]_&]:invert"
    on:click={handleDropdownClick}
  >
    <img src={menu} alt="menu" />
  </button>
  <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
  <ul
    tabindex="0"
    style:visibility={isDropdownOpen ? "visible" : "hidden"}
    class="dropdown-content menu my-1 shadow bg-base-100 rounded-box w-60 mt-3 z-20"
  >
    <!-- svelte-ignore a11y-missing-attribute -->
    {#each items as item}
      <li>
        <a class="flex flex-row items-center">
          <img src={item.img} />
          <span>{item.text}</span>
        </a>
      </li>
    {/each}
  </ul>
</div>
