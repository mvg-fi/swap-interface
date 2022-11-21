import type { TokenLists } from "./mvm-api";
import emptyToken from "$lib/images/empty-token.svg"
import { getAddress } from "ethers/lib/utils";

export const toHex = (num: string | number) => {
	const val = Number(num);
	return '0x' + val.toString(16);
};

export const shortenAddress = (addr: string) => {
	const number = 4;
	return addr.substring(0,number).toLowerCase() + "..." + addr.substring(addr.length-number).toLowerCase();
}

export const findIconFromTokenList = (tokenLists: TokenLists, tokenAddress: string) => {
	tokenAddress = getAddress(tokenAddress)
	return Object.values(tokenLists)[0][tokenAddress] == undefined ? emptyToken : Object.values(tokenLists)[0][tokenAddress].logoURI
}

export const findIconsFromTokenList = (tokenList: TokenLists, tokenAddresses: string[]) => {
	let list: string[] = [];
	tokenAddresses.forEach((e)=>{
		list.push(findIconFromTokenList(tokenList, e))
	})
	return list
}