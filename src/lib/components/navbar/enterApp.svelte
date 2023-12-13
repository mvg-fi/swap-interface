<script>
  import { goto } from "$app/navigation";
  import { _ } from "svelte-i18n";
</script>

<button class="btn btn-sm text-xs transition btn-primary rounded-full" on:click={()=>{goto('/swap')}}>
  <span class="text-base-100"> {$_("enter_app")} </span>
</button>
