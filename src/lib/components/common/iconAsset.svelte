<script lang="ts">
	import clsx from "clsx";
	import type { Asset } from "$lib/types/asset";
	import Empty from '$lib/images/empty-token.svg';
	import Image from "$lib/components/common/image.svelte";

	let assetClass: string | undefined = undefined;
	let chainClass: string | undefined = undefined;

	let asset: Asset | undefined;
	export { assetClass as class, chainClass, asset };
</script>

{#if asset}
<div class={clsx("relative", assetClass)}>
	<Image src={asset.logoURI} alt={asset.symbol} class="h-full w-full" />
	{#if asset.mixinChainIconUrl}
	<!-- TODO: BUG random image would appear on chrome -->
		<Image
			src={asset.mixinChainIconUrl || Empty}
			alt={asset.mixinChainName}
			class={clsx("absolute bottom-0 left-0 h-[14px] w-[14px]", chainClass)}
		/>
	{/if}
</div>
{:else}
	<Image src={Empty} alt="" />
{/if}