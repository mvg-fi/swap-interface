<script>
  import EnterApp from "./enterApp.svelte";
  import Logo from "./logo.svelte";
</script>

<div
  class="navbar bg-transparent w-full flex items-center text-base-content md:px-8 py-0"
>
  <div class="px-2.5 flex justify-between w-full">
    <Logo showText={false} />
    <EnterApp />
  </div>
</div>
