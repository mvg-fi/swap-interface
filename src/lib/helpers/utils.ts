import BigNumber from "bignumber.js";
import type { Asset } from "$lib/types/asset"
import { getAddress } from "ethers/lib/utils";
import evmMap from "$lib/constants/evmmap.json"
import Tokenlist from "$lib/constants/tokenlist.json"
import Chainlist from "$lib/constants/chainlist.json"
import type { IPoolData, IRouteStep } from "@zed-wong/mvgswap/lib/interfaces";

export const BN = BigNumber.clone({DECIMAL_PLACES:8})

export const toHex = (num: string | number) => {
	const val = Number(num);
	return '0x' + val.toString(16);
};

export const shortenAddress = (addr: string, start: number, end: number) => {
	return addr.substring(0, start).toLowerCase() + "..." + addr.substring(addr.length - end).toLowerCase();
}

export const findAssetFromTokenList = (tokenList: Asset[], tokenAddress: string): Asset | undefined => {
	return tokenList.find((obj) => { return obj.contract === getAddress(tokenAddress) })
}

export const findAssetsFromTokenList = (tokenList: Asset[], tokenAddresses: string[]): (Asset | undefined)[] => {
	let list: (Asset | undefined)[] = [];
	tokenAddresses.forEach((e) => {
		list.push(findAssetFromTokenList(tokenList, e))
	})
	return list
}
export const formatUSMoney = (x: string | number) => {
	return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(x))
}

export const formatCompactUSD = (x: number, places: number = 2) => {
	return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumSignificantDigits: places, notation: "compact", compactDisplay: "short" }).format(x)
}

export const formatPercentage = (x: number) => {
	return Number(x / 100).toLocaleString(undefined, { style: 'percent', minimumFractionDigits: 2 })
}

export const getToday = (sub: number = 0) => {
	const d = new Date()
	d.setDate(d.getDate() - sub)
	return d.toJSON().slice(0, 10).replace(/-/g, '/');
}

// export const getRouteList = (steps: IRouteStep[], first: string): string[] => {
// 	let l = [findAssetFromTokenList(Tokenlist, first)?.symbol || '']
// 	steps.forEach((e)=>{
// 		l.push(findAssetFromTokenList(Tokenlist,e.outputCoinAddress)?.symbol || '')
// 	})
// 	return l
// }

// export const formatRouteStr = (routes: string[]) => {
// 	let r = "";
// 	routes.forEach((e, index, routes)=>{
// 		if (index != routes.length-1) r+e+"->"
// 		else r+e
// 	})
// }

export const formatDecimals = (s: string | number, n: number) => {
	if (Number(s) == undefined || Number(s) == null ) return 0
	return Math.floor(Number(s) * 10 ** n) / 10 ** n
}

export const sortByString = (colHeader: string, data: IPoolData[], ascendingOrder: boolean) => {
	data = data.sort((obj1, obj2) => {
		if (obj1[colHeader] < obj2[colHeader]) {
			return -1;
		} else if (obj1[colHeader] > obj2[colHeader]) {
			return 1;
		}
		return 0;
	});
	if (!ascendingOrder) {
		data = data.reverse()
	}
	return data
}

export const sortByNumber = (colHeader: string, data: IPoolData[], ascendingOrder: boolean) => {
	return data.sort((obj1, obj2) => {
		return ascendingOrder ? Number(obj2[colHeader]) - Number(obj1[colHeader])
			: Number(obj1[colHeader]) - Number(obj2[colHeader])
	});
}

export const sortPools = (colHeader: string, data: IPoolData[], ascendingOrder: boolean) => {
	if (colHeader === 'name') {
		return sortByString(colHeader, data, ascendingOrder)
	}
	return sortByNumber(colHeader, data, ascendingOrder)
}

export const getChainByAsset = (assetID: string) => {
	return Object.values(Chainlist).find((chain) => {
		return chain.mixinAssetId === assetID
	})
}

export const isEVMAsset = (assetID: string) => {
	return getChainByAsset(assetID)?.evm || false
}

export const getEVMChainId = (assetID: string) => {
	if (!assetID) return
	return evmMap[assetID] || null
}

export const catchPaymentError = (err: unknown) => {
	const errorMap = {
		"ACTION_REJECTED":"user rejected transaction",		// Native Currency rejected
		"-32000": "invalid opcode: INVALID",							// ERC20 XIN,MANA (no balance)
		"UNPREDICTABLE_GAS_LIMIT": "cannot estimate gas; transaction may fail or may require manual gas limit", // ERC20 pUSD (no balance)
	}
}