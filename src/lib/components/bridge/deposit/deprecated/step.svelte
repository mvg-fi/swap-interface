<script lang="ts">
  import clsx from "clsx";

  export let max = 2;
  export let current = 0;
</script>

<div class="flex items-center justify-center p-5">
  <ul class="steps">
    {#each Array(max) as _, i}
      <li class={clsx("step", current===i + 1 && "step-info")} />
    {/each}
  </ul>
</div>
