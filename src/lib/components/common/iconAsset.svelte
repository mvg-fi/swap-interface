<script lang="ts">
	import clsx from "clsx";
	import type { Asset } from "$lib/types/asset";
	import Image from "$lib/components/common/image.svelte";

	let assetClass: string | undefined = undefined;
	let chainClass: string | undefined = undefined;

	let asset: Asset;
	export { assetClass as class, chainClass, asset };
</script>

<div class={clsx("relative", assetClass)}>
	<Image src={asset.logoURI} alt={asset.symbol} class="h-full w-full" />
	{#if asset.mixinChainIconUrl}
		<Image
			src={asset.mixinChainIconUrl}
			alt={asset.mixinChainName}
			class={clsx("absolute bottom-0 left-0 h-[14px] w-[14px]", chainClass)}
		/>
	{/if}
</div>