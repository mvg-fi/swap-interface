import type {Asset} from "$lib/types/asset"
import { getAddress } from "ethers/lib/utils";

export const toHex = (num: string | number) => {
	const val = Number(num);
	return '0x' + val.toString(16);
};

export const shortenAddress = (addr: string, start: number, end: number) => {
	return addr.substring(0, start).toLowerCase() + "..." + addr.substring(addr.length - end).toLowerCase();
}

export const findAssetFromTokenList = (tokenList: Asset[], tokenAddress: string): Asset | undefined => {
	tokenAddress = getAddress(tokenAddress)
	return tokenList.find((obj)=>{return obj.contract === tokenAddress}) 
}

export const findAssetsFromTokenList = (tokenList: Asset[], tokenAddresses: string[]): (Asset| undefined)[] => {
	let list: (Asset|undefined)[] = [];
	tokenAddresses.forEach((e) => {
		list.push(findAssetFromTokenList(tokenList, e))
	})
	return list
}
export const formatUSMoney = (x: string | number) => {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const getToday = (sub: number = 0) => {
	const d = new Date()
	d.setDate(d.getDate()-sub)
	return d.toJSON().slice(0,10).replace(/-/g,'/');
}

export const formatDecimals = (s: string|number, n: number) => {
	return Math.floor(Number(s)*10**n)/10**n || 0
}