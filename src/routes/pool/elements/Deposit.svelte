<script>
  import Button from "./deposit/button.svelte";
  import Infos from "./deposit/infos.svelte";
  import Input from "./deposit/input.svelte";
  import Title from "./deposit/title.svelte";
</script>

<div class="card max-w-sm min-w-[23rem] w-96 bg-base-100 shadow-xl">
  <div class="flex flex-col">
    <div class="my-3 mb-2">
      <Title />
    </div>
    <div class="mx-2">
      <Input />
    </div>
    <div>
      <Infos />
    </div>
    <div>
      <Button />
    </div>
  </div>
</div>
