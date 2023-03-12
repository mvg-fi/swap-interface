<script lang="ts">
  import { _ } from "svelte-i18n"
  import { process } from "$lib/stores/pool/factory";
</script>

<div
  class="bg-base-100 flex flex-col px-2 pt-2 pb-3 md:p-6 xl:p-12 md:rounded-xl gap-y-6 xl:shadow-md"
>
  <div class="space-y-2">
    <div
      class="flex justify-between text-sm xl:text-base"
    >
      <p class="font-bold xl:text-primary">{$_("pool.create_new_pool")}</p>
      <p class="opacity-60">{$_("pool.step_x_of_y", {values: {x:1, y:3}})}</p>
    </div>
    <progress max="3" value={$process} class="progress progress-primary h-4 w-full" />
  </div>
  {#if $process === 1}
    <div class="space-y-1">
      <p class="text-3xl font-bold">
        {$_('pool.select_pool_type')}
      </p>
      <span class="text-lg opacity-80">
        {$_('pool.select_pool_type_info')}
      </span>
    </div>
  {:else if $process === 2}
    <div class="space-y-1">
      <p class="text-3xl font-bold">
        {$_('pool.select_pool_type')}
      </p>
      <span class="text-lg opacity-80">
        {$_('pool.select_pool_type_info')}
      </span>
    </div>
  {:else if $process === 3}
    <div class="space-y-1">
      <p class="text-3xl font-bold">
        {$_('pool.select_pool_type')}
      </p>
      <span class="text-lg opacity-80">
        {$_('pool.select_pool_type_info')}
      </span>
    </div>
  {/if}
</div>
