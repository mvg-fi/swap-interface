export interface Chain {
	chainId: string,
	contract: string,
	decimals: string,
	logoURI: string,
	mixinAssetId: string,
	mixinChainId: string,
	name: string,
	stable: string,
	symbol: string,
  evm: boolean,
}