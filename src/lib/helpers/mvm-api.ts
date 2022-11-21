import { CodeClient } from '@mixin.dev/mixin-node-sdk';
import type { PaymentRequestResponse } from '@mixin.dev/mixin-node-sdk';
import type { RegisteredUser } from '$lib/types/user';
import ExternalClient from '@mixin.dev/mixin-node-sdk/src/client/external';

export interface TokenLists {
	key: TokenList
}
export interface TokenList {
	chainId:      number;
	decimals:     number;
	logoURI:      string;
	mixinAssetId: string;
	mixinChainId: string;
	name:         string;
	stable:       boolean;
	symbol:       string;
}


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

export const fetchExchangeRates = ExternalClient().exchangeRates;

export const fetchMvmTokens = async (address: `0x${string}`) => {
	const response = await fetch(
		`https://scan.mvm.dev/api?module=account&action=tokenlist&address=${address}`
	);
	const { result, status } = await response.json();
	if (!status) throw new Error('No result');
	return result as {
		balance: string;
		contractAddress: string;
		decimals: string;
		name: string;
		symbol: string;
		type: string;
	}[];
};

export const fetchMVGTokenList = async () => {
	const response = await fetch(
		`https://raw.githubusercontent.com/zed-wong/mvm-tokenlist/main/MVG-tokenlist.json`
	)
	const result = await response.json();
	console.log("result:",result)
	return result as TokenList[]
}