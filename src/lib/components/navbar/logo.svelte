<script lang="ts">
  import clsx from "clsx"
  import MVG from "$lib/images/logo/mvg.svg";

  let path = "/";
  let clazz = "w-7";
  let showText = true;
  export { clazz as class, path, showText };
</script>

<a href={path} class="flex items-center text-center ubuntu">
  <img src={MVG} alt="" class={clsx(clazz)} />
  {#if showText}
  <span class="title text-base-content font-semibold ml-2 hidden md:inline"> MVG </span>
  <div class="badge badge-primary badge-outline badge-md ml-1.5 hidden md:inline">
    <span class="">Swap</span>
  </div>
  {/if}
</a>

<style>
  .title {
    font-size: 22px;
  }
  .btn-ghost:hover {
    --tw-bg-opacity: 0;
  }
</style>
