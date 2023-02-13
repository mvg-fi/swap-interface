export interface TokenList {
	chainId: number,
	contract: string,
	decimals: number,
	logoURI: string,
	mixinAssetId: string,
	mixinChainId: string,
	name: string,
	stable: boolean,
	symbol: string,
}

export interface Asset extends TokenList {
	balance?: string | number | undefined,
	priceUsd?: string | number | undefined,
	mixinChainName?: string,
	mixinChainSymbol?: string,
	mixinChainIconUrl?: string,
}