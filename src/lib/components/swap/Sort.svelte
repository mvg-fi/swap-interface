<script lang="ts">
  import SortIcon from "$lib/images/sort.svg";
</script>

<button>
  <img src={SortIcon} alt="s" class="sort" />
</button>

<style>
  .sort {
    width: 20px;
    opacity: 0.7;
  }
  .sort:hover{
    opacity: 0.4;
    cursor: pointer;
    transform: rotate(180deg);
    transition: transform 0.5s;
  }
  .sort:not(:hover) {
    transition: transform 0.7s;
  }
</style>