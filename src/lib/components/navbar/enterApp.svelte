<script>
  import { goto } from "$app/navigation";
  import { _ } from "svelte-i18n";
</script>

<button class="btn btn-sm md:btn-md btn-outline transition btn-primary rounded-full text-base-content hover:text-base-100" on:click={()=>{goto('/swap')}}>
  <span class=""> {$_("enter_app")} </span>
</button>