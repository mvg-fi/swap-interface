<script>
  import Button from "./deposit/button.svelte";
  import Infos from "./deposit/infos.svelte";
  import Input from "./deposit/input.svelte";
  import Title from "./deposit/title.svelte";
</script>

<div class="card max-w-sm min-w-[23rem] w-96 bg-base-100 shadow-xl p-2">
  <div class="flex flex-col">
    <div class="my-2 select-none">
      <Title />
    </div>
    <div class="mx-2 select-none">
      <Input />
    </div>
    <div class="mx-4 my-2">
      <Infos />
    </div>
    <div class="mx-3 mb-2 select-none">
      <Button />
    </div>
  </div>
</div>