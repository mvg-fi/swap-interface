<script lang="ts">
  import clsx from 'clsx';
  import type { Asset } from '$lib/types/asset';

  let assetClass: string | undefined = undefined;
  let chainClass: string | undefined = undefined;
  
  let asset: Asset;
	export { assetClass as class, chainClass, asset };
</script>

<div class={clsx('relative h-10 w-10', assetClass)}>
	<img loading="lazy" src={asset.logoURI} class="h-full w-full" alt={asset.symbol} />
	{#if asset.mixinChainIconUrl}
		<img
			loading="lazy"
			src={asset.mixinChainIconUrl}
			class={clsx('absolute bottom-0 left-0 h-[14px] w-[14px]', chainClass)}
			alt={asset.mixinChainName}
		/>
	{/if}
</div>