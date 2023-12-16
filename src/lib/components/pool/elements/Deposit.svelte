<script>
  import clsx from "clsx";
  import { depositError } from "$lib/stores/pool/pools";
  import Button from "$lib/components/pool/elements/deposit/button.svelte";
  import Infos from "$lib/components/pool/elements/deposit/infos.svelte";
  import Input from "$lib/components/pool/elements/deposit/input.svelte";
  import Title from "$lib/components/pool/elements/deposit/title.svelte";
  import Options from "$lib/components/pool/elements/deposit/options.svelte";
</script>

<div
  class="card md:max-w-sm md:w-96 bg-base-100 md:shadow-2xl shadow-md p-3"
>
  <div class="flex flex-col">
    <div class="my-2 mt-1 select-none">
      <Title />
    </div>
    <div class="mx-1 select-none">
      <Input />
    </div>
    <div class="mt-3">
      <Options />
    </div>
    <div class={clsx(!$depositError&&"mx-3","my-2")}>
      <Infos />
    </div>
    <div class="my-2 mx-2 select-none">
      <Button />
    </div>
  </div>
</div>