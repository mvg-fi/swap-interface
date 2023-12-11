<script>
  import { onDestroy } from "svelte";
  import Button from "./withdrawal/button.svelte";
  import Infos from "./withdrawal/infos.svelte";
  import Input from "./withdrawal/input.svelte";
  import Selector from "./withdrawal/selector.svelte";
  import Title from "./withdrawal/title.svelte";
  import { depositMode } from "$lib/stores/pool/mode";

  onDestroy(()=>{
    depositMode.set(true)
  })
</script>

<div class="card md:max-w-sm md:w-96 bg-base-100 md:shadow-2xl p-3">
  <div class="flex flex-col">
    <div class="my-2 mt-1 select-none">
      <Title />
    </div>
    <div class="mx-1 select-none">
      <Input />
    </div>
    <div class="mx-1 mt-2 select-none">
      <Selector />
    </div>
    <div class="mx-3 my-2">
      <Infos />
    </div>
    <div class="my-2 mx-2 select-none">
      <Button />
    </div>
  </div>
</div>
