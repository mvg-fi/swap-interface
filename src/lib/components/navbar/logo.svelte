<script lang="ts">
  import clsx from "clsx"
  import MVG from "$lib/images/logo/mvg.svg";

  let clazz = "w-7";
  export { clazz as class };
</script>

<a href="/swap" class="flex">
  <img src={MVG} alt="" class={clsx(clazz)} />
  <span class="title text-base-content ml-0.5 font-semibold ml-2 hidden md:inline"> MVG </span>
</a>

<style>
  .title {
    font-size: 22px;
    font-family:
      ui-sans-serif,
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      Segoe UI,
      Roboto,
      Helvetica Neue,
      Arial,
      Noto Sans,
      sans-serif,
      "Apple Color Emoji",
      "Segoe UI Emoji",
      Segoe UI Symbol,
      "Noto Color Emoji";
  }
  .btn-ghost:hover {
    --tw-bg-opacity: 0;
  }
</style>
