<script>
  import Selector from "$lib/components/pool/elements/staking/selector.svelte";
  import Title from "$lib/components/pool/elements/staking/title.svelte";
  import Input from "$lib/components/pool/elements/staking/input.svelte";
  import Button from "$lib/components/pool/elements/staking/button.svelte";
</script>

<div class="card md:max-w-sm md:w-96 bg-base-100 md:shadow-2xl shadow-md p-3 min-w-full">
  <div class="flex flex-col">
    <div class="my-2 mt-1 select-none">
      <Title />
    </div>
    <div class="mx-1 mt-2 select-none">
      <Selector />
    </div>
    <div class="mx-1 select-none">
      <Input />
    </div>
    <!-- <div class="mx-3 my-2">
      <Infos />
    </div> -->
    <div class="m-2 mt-4 select-none">
      <Button />
    </div>
  </div>
</div>
