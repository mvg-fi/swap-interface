<script>
  import { _ } from "svelte-i18n"
</script>

<div class="w-full h-full flex flex-col align-center text-center bg-base-100 bgi">
  <span class="text-4xl font-extrabold text-center md:5xl lg:text-7xl 2xl:text-8xl smt mb-4 md:mb-6">
    {$_('tested_by_time')}
  </span>

  <span class="text-lg leading-8 text-gray-600 px-4">
    {$_('tested_by_time_t')}
  </span>

</div>

<style>
  .smt {
    margin-top: 20vh;
  }
</style>