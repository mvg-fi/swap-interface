<script lang="ts">
  import Account from "./details/account.svelte";
  import Buttons from "./details/buttons.svelte";
</script>

<div class="card-body flex flex-col">
  <div class="text-black flex flex-row text-start items-center">
    <Account />
  </div>
  <div class="mt-3 grid grid-cols-3" >
    <Buttons />
  </div>
</div>
