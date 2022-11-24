<script>
  import { fade } from "svelte/transition";
  import Button from "./deposit/button.svelte";
  import Infos from "./deposit/infos.svelte";
  import Input from "./deposit/input.svelte";
  import Title from "./deposit/title.svelte";
</script>

<div
  class="card max-w-sm min-w-[23rem] w-96 bg-base-100 shadow-2xl p-3"
  in:fade
>
  <div class="flex flex-col">
    <div class="my-2 mt-1 select-none">
      <Title />
    </div>
    <div class="mx-1 select-none">
      <Input />
    </div>
    <div class="mx-3 my-2">
      <Infos />
    </div>
    <div class="my-2 mx-2 select-none">
      <Button />
    </div>
  </div>
</div>
