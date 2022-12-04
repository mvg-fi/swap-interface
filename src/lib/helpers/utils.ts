import type { TokenLists } from "./mvm-api";
import emptyToken from "$lib/images/empty-token.svg"
import { getAddress } from "ethers/lib/utils";

export const toHex = (num: string | number) => {
	const val = Number(num);
	return '0x' + val.toString(16);
};

export const shortenAddress = (addr: string, start: number, end: number) => {
	return addr.substring(0, start).toLowerCase() + "..." + addr.substring(addr.length - end).toLowerCase();
}

export const findIconFromTokenList = (tokenLists: TokenLists, tokenAddress: string) => {
	tokenAddress = getAddress(tokenAddress)
	return Object.values(tokenLists)[0][tokenAddress] == undefined ? emptyToken : Object.values(tokenLists)[0][tokenAddress].logoURI
}

export const findIconsFromTokenList = (tokenList: TokenLists, tokenAddresses: string[]) => {
	let list: string[] = [];
	tokenAddresses.forEach((e) => {
		list.push(findIconFromTokenList(tokenList, e))
	})
	return list
}

export const formatUSMoney = (x: string | Number) => {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const getToday = (sub: number = 0) => {
	const d = new Date()
	d.setDate(d.getDate()-sub)
	return d.toJSON().slice(0,10).replace(/-/g,'/');
}

export const format8Decimals = (s: string) => {
	return Math.floor(Number(s)*10**8)/10**8 || 0
}