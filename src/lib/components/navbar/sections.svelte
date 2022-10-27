<script lang="ts">
  import { page } from "$app/stores";
</script>

<ul class="menu horizontal">
  <li>
    <a
      href="/swap"
      class="btn btn-ghost no-animation sub"
      class:selected={$page.url.pathname === "/swap"}
    >
      Swap
    </a>
  </li>
  <li>
    <a
      href="/pool"
      class="btn btn-ghost no-animation sub"
      class:selected={$page.url.pathname === "/pool"}
    >
      Pool
    </a>
  </li>
</ul>

<style>
  .sub {
    color: grey;
    font-size: 15px;
    font-weight: 500 !important;
    border-radius: 0.5rem;
  }
  .selected {
    color: black;
  }
</style>
