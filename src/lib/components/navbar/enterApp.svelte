<script>
  import { goto } from "$app/navigation";
  import { _ } from "svelte-i18n";
</script>

<button class="btn btn-md btn-primary rounded-3xl md:rounded-2xl" on:click={()=>{goto('/swap')}}>
  <span class="text-base-100"> {$_("enter_app")} </span>
</button>
