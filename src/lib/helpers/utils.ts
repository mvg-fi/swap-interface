import type { TokenList, TokenLists } from "./mvm-api";

export const toHex = (num: string | number) => {
	const val = Number(num);
	return '0x' + val.toString(16);
};

export const shortenAddress = (addr: string) => {
	const number = 4;
	return addr.substring(0,number).toLowerCase() + "..." + addr.substring(addr.length-number).toLowerCase();
}

export const findIconFromTokenList = (tokenLists: TokenLists, tokenAddress: string) => {
	console.log(tokenLists, '\n', tokenAddress)

	for (const [key, value] of Object.entries(tokenLists)) {
		if (tokenAddress === key) return value.logoURI
	}
	return "";
}

export const findIconsFromTokenList = (tokenList: TokenLists, tokenAddresses: string[]) => {
	let list: string[] = [];
	tokenAddresses.forEach((e)=>{
		list.push(findIconFromTokenList(tokenList, e))
	})
	return list
}

// export const findIconsByAddresses = async (addresses: string[]):Promise<string[]>  => {
// 	const tokenList = await fetchMVGTokenList()
// 	let logos: Array<string> = [];

// 	addresses.forEach(e => {
// 		try {
// 			logos.push(findIconFromTokenlist(tokenList,e));
// 		} catch (error) {
// 			if (error instanceof TypeError) {
// 				logos.push('');
// 			}
// 		}
// 	})
// 	return logos
// }