import BigNumber from "bignumber.js";
import { goto } from '$app/navigation';
import { browser } from "$app/environment";
import type { Asset } from "$lib/types/asset"
import { getAddress } from "ethers/lib/utils";
import evmMap from "$lib/constants/evmmap.json"
import evmMapr from "$lib/constants/evmmapr.json"
import Tokenlist from "$lib/constants/tokenlist.json"
import Chainlist from "$lib/constants/chainlist.json"
import type { ColHeaders } from "$lib/types/pool";
import type { IPoolData } from "@zed-wong/mvgswap/lib/interfaces";
import { BSC_SCAN_URL, ETHER_SCAN_URL, POLYGON_SCAN_URL } from "$lib/helpers/constants";

export const BN = BigNumber.clone({ DECIMAL_PLACES: 8 })

export const toHex = (num: string | number) => {
	const val = Number(num);
	return '0x' + val.toString(16);
};

export const shortenAddress = (addr: string, start: number, end: number) => {
	return addr.substring(0, start).toLowerCase() + "..." + addr.substring(addr.length - end).toLowerCase();
}

export const findAssetFromTokenListById = (tokenList: Asset[] = Object.values(Tokenlist), assetID: string): Asset | undefined => {
	return tokenList.find((obj) => { return obj.mixinAssetId === assetID })
}

export const findAssetFromTokenList = (tokenList: Asset[] = Object.values(Tokenlist), tokenAddress: string): Asset | undefined => {
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

// has units like $300M, $1B
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

export const formatDecimals = (s: string | number, n: number) => {
	if (Number(s) == undefined || Number(s) == null || Number(s) == 0) return 0
	return Math.floor(Number(s) * 10 ** n) / 10 ** n
}

export const sortByString = (colHeader: ColHeaders, data: [string, IPoolData][], ascendingOrder: boolean) => {
	data = data.sort((obj1, obj2) => {
		if (obj1[1][colHeader] < obj2[1][colHeader]) {
			return -1;
		} else if (obj1[1][colHeader] > obj2[1][colHeader]) {
			return 1;
		}
		return 0;
	});
	if (!ascendingOrder) {
		data = data.reverse()
	}
	return data
}

export const sortByNumber = (colHeader: string, data: [string, IPoolData][], ascendingOrder: boolean) => {
	return data.sort((obj1, obj2) => {
		return ascendingOrder ? Number(obj2[1][colHeader]) - Number(obj1[1][colHeader])
			: Number(obj1[1][colHeader]) - Number(obj2[1][colHeader])
	});
}

export const sortPools = (colHeader: string, data: [string, IPoolData][], ascendingOrder: boolean) => {
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

export const getChainByContract = (contract: string) => {
	return Object.values(Chainlist).find((chain) => {
		return chain.contract === contract
	})
}

export const multiply = (a: string, b: string) => {
	return new BigNumber(a).times(new BigNumber(b)).toString();
};

export const getSum = (strings: string[]) => {
	return strings.reduce((acc: BigNumber, curr: string) => {
		return acc.plus(new BigNumber(curr));
	}, new BigNumber(0));
};

export const getUsdTotal = (prices: string[], amounts: string[]) => {
	// multiply each element in the two arrays
	const multiplied = prices.map((price, index) => {
		if (price == '' || price == undefined || price == null) return 0
		return new BigNumber(price).times(new BigNumber(amounts[index]));
	});

	// calculate the sum
	const sum = multiplied.reduce((acc, curr) => {
		return acc.plus(curr);
	}, new BigNumber(0));

	return sum.toString();
};

export const getPercentage = (strings: string[], element: string) => {
	if (element == '') return 0;
	// calculate the sum of the array
	const sum = strings.reduce((acc, curr) => {
		return acc.plus(new BigNumber(curr));
	}, new BigNumber(0));

	// calculate the percentage
	const percentage = new BigNumber(element).dividedBy(sum).times(100);

	return percentage.toFixed(2);
};

export const isEVMAsset = (assetID: string) => {
	return getChainByAsset(assetID)?.evm || false
}

export const getEVMChainId = (assetID: string): string => {
	if (!assetID || Number(assetID) == 0) return ''
	return evmMap[assetID] || ''
}

export const getEVMChainByAssetId = (chainID: string | number): string => {
	if (!chainID || Number(chainID) == 0) return ''
	return evmMapr[String(chainID)] || ''
}

export const getEVMScanByAssetId = (assetID: string) => {
	const chain = getEVMChainId(assetID)
	switch (chain) {
		case "1":
			// Mainnet
			return ETHER_SCAN_URL
		case "56":
			// BSC
			return BSC_SCAN_URL
		case "137":
			// Polygon
			return POLYGON_SCAN_URL
	}
	return ETHER_SCAN_URL
}

export const catchPaymentError = (err: unknown) => {
	const errorMap = {
		"ACTION_REJECTED": "user rejected transaction",		// Native Currency rejected
		"-32000": "invalid opcode: INVALID",							// ERC20 XIN,MANA (no balance)
		"UNPREDICTABLE_GAS_LIMIT": "cannot estimate gas; transaction may fail or may require manual gas limit", // ERC20 pUSD (no balance)
	}
}

// Filter bind:keyup input events
// If event code valid, return true
// If event code invalid, return false
// 0-9, Backspace, .
export const filterInputEvents = (event: KeyboardEvent): boolean => {
	if (
		event.code.includes('Digit') ||
		event.code.includes('Backspace') ||
		event.code.includes('Period')
	) return true
	return false
}

export const arrayAreAllNull = (values: number[]) => { return values.every((e) => e == null || e == 0 || e == undefined); }

export const goBack = () => {
	history.back()
}