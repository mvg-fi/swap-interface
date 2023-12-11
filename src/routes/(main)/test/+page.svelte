<script lang="ts">
  import curve from "@zed-wong/mvgswap";

  const test = async () => {

    console.log(curve.chainId)
    console.log(await curve.router.getBestRouteAndOutput('0x910Fb1751B946C7D691905349eC5dD250EFBF40a', '0x12959642c33d4A3c4d1b4d68c88b5f50Ed223305', 1))
  }
</script>

<div>
  <button class="btn" on:click={()=>test()}> just a test</button>
</div>