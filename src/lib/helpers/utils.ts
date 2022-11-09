import type { IDict, IPoolData } from "$lib/constants/interfaces";

export const toHex = (num: string | number) => {
	const val = Number(num);
	return '0x' + val.toString(16);
};

export const lowerCaseValues = (dict: IDict<string>): IDict<string> => {
	return Object.fromEntries(Object.entries(dict).map((entry) => [entry[0], entry[1].toLowerCase()]))
}

export const lowerCasePoolDataAddresses = (poolsData: IDict<IPoolData>): IDict<IPoolData> => {
	for (const poolId in poolsData) {
			if (!Object.prototype.hasOwnProperty.call(poolsData, poolId)) continue;
			const poolData = poolsData[poolId];
			poolData.swap_address = poolData.swap_address.toLowerCase();
			poolData.token_address = poolData.token_address.toLowerCase();
			if (poolData.gauge_address) poolData.gauge_address = poolData.gauge_address.toLowerCase();
			if (poolData.deposit_address) poolData.deposit_address = poolData.deposit_address.toLowerCase();
			if (poolData.sCurveRewards_address) poolData.sCurveRewards_address = poolData.sCurveRewards_address.toLowerCase();
			if (poolData.reward_contract) poolData.reward_contract = poolData.reward_contract.toLowerCase();
			poolData.underlying_coin_addresses = poolData.underlying_coin_addresses.map((a) => a.toLowerCase());
			poolData.wrapped_coin_addresses = poolData.wrapped_coin_addresses.map((a) => a.toLowerCase());
	}
	return poolsData
}