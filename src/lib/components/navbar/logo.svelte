<script lang="ts">
  import clsx from "clsx"
  import MVG from "$lib/images/logo/mvg.svg";

  let path = "";
  let clazz = "w-7";
  export { clazz as class, path };
</script>

<a href={path} class="flex">
  <img src={MVG} alt="" class={clsx(clazz)} />
  <span class="title text-base-content font-semibold ml-2 hidden md:inline"> MVG </span>
</a>

<style>
@import url('https://fonts.cdnfonts.com/css/ubuntu');
  .title {
    font-size: 22px;
    font-family: 'Ubuntu', sans-serif;
    font-weight: 600 !important;
  }
  .btn-ghost:hover {
    --tw-bg-opacity: 0;
  }
</style>
