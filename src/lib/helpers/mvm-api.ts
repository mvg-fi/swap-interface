import type { PaymentRequestResponse, NetworkAssetResponse } from '@mixin.dev/mixin-node-sdk';
import ExternalClient from '@mixin.dev/mixin-node-sdk/src/client/external';
import { CodeClient, NetworkClient } from '@mixin.dev/mixin-node-sdk';
import type { RegisteredUser, User } from '$lib/types/user';
import { ETH_ASSET_ID } from '$lib/helpers/constants';
import TL from '$lib/constants/tokenlist.json';
import { getBalance } from '$lib/helpers/web3';
import type { Asset } from '$lib/types/asset';
import { bigMul } from './web3/big';
import { sortBy } from 'lodash-es';
import { utils } from 'ethers';

export const register = async (address: string): Promise<RegisteredUser> => {
	const response = await fetch('https://bridge.mvm.dev/users', {
		method: 'POST',
		body: JSON.stringify({ public_key: address })
	});

	const { user } = await response.json();
	return user;
};

export const fetchCode = async (code_id: string): Promise<PaymentRequestResponse> => {
	const client = CodeClient();
	const response = await client.fetch(code_id);
	return response as PaymentRequestResponse;
};

export const fetchAsset =async (assetID: string) => {
	const client = NetworkClient();
	const response = await client.fetchAsset(assetID);
	return response as NetworkAssetResponse;
}

export const fetchAssets = async (user: User | undefined) => {
	const networkClient = NetworkClient();

	const [allAssets, ethBalance, tokens] = await Promise.all([
		(async () => {
			return await Promise.all(Object.values(TL).map((obj) => networkClient.fetchAsset(obj.mixinAssetId)));
		})(),
		user
			? getBalance({
					account: user.address,
					network: 'mvm'
			  })
			: undefined,
		user ? fetchMvmTokens(user.address) : undefined
	]);

	// priceUsd
	let finalList: Asset[] = [];
	Object.values(TL).forEach(
		(obj) => {
			let v: Asset = obj;
			const asset = allAssets.find(a => a.asset_id === obj.mixinAssetId);
			v.priceUsd = asset?.price_usd;
			finalList.push(v);
		}
	)
	// balance
	finalList = finalList.map((a) => {
		const asset = a as Asset;
		if (asset.mixinAssetId === ETH_ASSET_ID && ethBalance) {
			asset.balance = ethBalance;
			return asset;
		}
		const token = tokens?.find(
			(token: any) => token.contractAddress.toLowerCase() === asset.contract?.toLowerCase()
		);
		if (!token) {
			asset.balance = '0';
			return asset;
		}
		asset.balance = utils.formatUnits(token?.balance, token?.decimals);
		return asset;
	});

	finalList = finalList.filter(
		({ contract, mixinAssetId }) => contract || mixinAssetId === ETH_ASSET_ID
	);

	// chains
	const chainIds = [...new Set(finalList.map(({ mixinChainId }) => mixinChainId))];
	const chains = await Promise.all(
		chainIds.map((chainId) => {
			const chain = allAssets.find((asset) => asset.asset_id === chainId);
			if (chain) return chain;
			return networkClient.fetchAsset(chainId);
		})
	);
	// chain
	finalList.forEach((asset) => {
		if (asset.mixinAssetId === asset.mixinChainId) return;

		const chain = chains.find((chain) => chain.asset_id === asset.mixinChainId);
		if (chain) {
			asset.mixinChainIconUrl = chain.icon_url;
			asset.mixinChainName = chain.name;
			asset.mixinChainSymbol = chain.symbol;
		}
	});
	// balance_value > price_usd > balance
	finalList = sortBy(
		finalList,
		({ balance, priceUsd }) => +bigMul(Number(balance), Number(priceUsd)),
		'balance',
		({ priceUsd }) => +Number(priceUsd),
	).reverse();

	return finalList;
};

export const fetchMvmTokens = async (address: `0x${string}`) => {
	const response = await fetch(
		`https://scan.mvm.dev/api?module=account&action=tokenlist&address=${address}`
	);
	const { result, status } = await response.json();
	if (!status) throw new Error('No result');
	
	return result;
};

// export const fetchExchangeRates = ExternalClient().exchangeRates;
// https://api.mixin.one/external/transactions?asset=b7938396-3f94-4e0a-9179-d3440718156f&destination=0xB14F5F5483E37E80243cEf6291D4c0DE1E3738e0
export const fetchPendingDeposit = ExternalClient().deposits;
