import { lowerCaseValues } from "$lib/helpers/utils";

export const ETH_COINS_MVM: { [index: string]: string } = {
    eth: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",  // ETH
}

export const USD_COINS_MVM: { [index: string]: string } = {
    usdterc20: "0xdAC17F958D2ee523a2206206994597C13D831ec7",  // USDT-ERC20
    usdttrc20: "0xac2ac36102f96f1fded2724f1d54b9fca6bbf1ee",  // USDT-TRC20
    pusd: "0xa8090f6f19295321968b2f3bcdb44d20bb15742e",  // pUSD
    usdc: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",  // USDC
}

export const TEST_COINS_MVM: { [index: string]: string } = {
    cnb: "0x910Fb1751B946C7D691905349eC5dD250EFBF40a",
    shib: "0x12959642c33d4A3c4d1b4d68c88b5f50Ed223305",
    amituo: "0x95D78888886259693a877D64739c45946D541e78",
    one: "0x39028Df0a20426a0d724Ab1504A9a862FA40608a",
}

export const COINS_MVM: { [index: string]: string } = lowerCaseValues({
    ...ETH_COINS_MVM,
    ...USD_COINS_MVM,
    ...TEST_COINS_MVM,
});

const DECIMALS_MVM: { [index: string]: number } = {
    "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE": 18,  // ETH
    "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48": 8,  // USDC
    "0xdAC17F958D2ee523a2206206994597C13D831ec7": 8,  // USDT
    "0xa8090f6f19295321968b2f3bcdb44d20bb15742e": 8,  // pUSD

    "0x910Fb1751B946C7D691905349eC5dD250EFBF40a": 8,  // CNB
    "0x12959642c33d4A3c4d1b4d68c88b5f50Ed223305": 8,  // SHIB
    "0x95D78888886259693a877D64739c45946D541e78": 8,  // AMITUO
    "0x39028Df0a20426a0d724Ab1504A9a862FA40608a": 8,  // ONE
}