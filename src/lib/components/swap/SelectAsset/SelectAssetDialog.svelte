<script lang="ts">
  import Close from "$lib/images/close.svg";
  import SingleAsset from "$lib/components/swap/SelectAsset/SingleAsset.svelte";

  export let id:string;
  // placeholder
  const assets = [
    {
      logoURI:
        "https://mixin-images.zeromesh.net/HvYGJsV5TGeZ-X9Ek3FEQohQZ3fE9LBEBGcOcn4c4BNHovP4fW4YB97Dg5LcXoQ1hUjMEgjbl1DPlKg1TW7kK6XP=s128",
      symbol: "BTC",
      name: "Bitcoin",
    },
  ];
</script>

<div class="modal modal-bottom sm:modal-middle">
  <div class="modal-box relative h-4/5 p-0">
    <div class="flex p-5">
      <h3 class="font-bold text-lg flex-1">Select a token</h3>
      <label for={id} class="flex-0 btn btn-xs btn-circle btn-ghost">
        <img src={Close} alt="x" />
      </label>
    </div>
    <ul class="menu bg-base-100 w-full">
      {#each assets as asset}
        <li>
          <SingleAsset {asset} />
        </li>
      {/each}
    </ul>
  </div>
</div>