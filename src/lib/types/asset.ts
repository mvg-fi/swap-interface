export interface TokenList {
	chainId: string,
	contract: string,
	decimals: string,
	logoURI: string,
	mixinAssetId: string,
	mixinChainId: string,
	name: string,
	stable: string,
	symbol: string,
}

export interface Asset extends TokenList {
	balance?: string | Number | undefined,
	priceUsd?: string | Number | undefined,
	mixinChainName?: string,
	mixinChainSymbol?: string,
	mixinChainIconUrl?: string,
}