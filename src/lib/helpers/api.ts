import { CodeClient } from '@mixin.dev/mixin-node-sdk';
import type { PaymentRequestResponse } from '@mixin.dev/mixin-node-sdk';
import type { RegisteredUser, User } from '$lib/types/user';
import ExternalClient from '@mixin.dev/mixin-node-sdk/src/client/external';

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