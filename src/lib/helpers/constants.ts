import type { NetworkParam } from '../types/network';
import { toHex } from '$lib/helpers/utils';

// Infos
export const APP_NAME = 'MVG Swap'

// Icons
export const MVM_ICON = 'https://mvm.dev/logo.svg'

// Keys
export const USER_KEY = 'USER';
export const LANG = 'lang';
export const PROVIDER_KEY = 'injected'
export const INFURA_KEY = import.meta.env.INFURA_KEY
export const WALLET_CONNECT_KEY = import.meta.env.WALLET_CONNECT_KEY

// URLs
export const ETHER_SCAN_URL = 'https://etherscan.io/'
export const MAINNET_RPC_URL = `https://mainnet.infura.io/v3/${INFURA_KEY}`
export const MVM_RPC_URL = "https://geth.mvm.dev/";
export const MVM_SCAN_URL = "https://scan.mvm.dev/";

// Addresses
export const REGISTRY_PID = 'bd67087276ce3263b9333aa337e212a4';
export const REGISTRY_ADDRESS = '0x3c84B6C98FBeB813e05a7A7813F0442883450B1F';
export const BRIDGE_ADDRESS = '0x0915EaE769D68128EEd9711A0bc4097831BE57F3';
export const STORAGE_ADDRESS = '0xef241988D19892fE4efF4935256087F4fdc5ecAa';

// AssetID
export const ETH_ASSET_ID = '43d61dcd-e413-450d-80b8-101d5e903357';
export const XIN_ASSET_ID = 'c94ac88f-4671-3976-b60a-09064f1811e8';
export const TRX_ASSET_ID = '25dabac5-056a-48ff-b9f9-f67395dc407c';
export const EOS_ASSET_ID = '6cfe566e-4aad-470b-8c9a-2fd35b49c68d';
export const MOB_ASSET_ID = 'eea900a8-b327-488c-8d8d-1428702fe240';

// ChainID
export const MAINNET_CHAIN_ID = 1;
export const MVM_CHAIN_ID = 73927;
export const MAINNET_CHAIN_HEX_ID = toHex(MAINNET_CHAIN_ID);
export const MVM_CHAIN_HEX_ID = toHex(MVM_CHAIN_ID);

// Network
export const networkParams: Record<string, NetworkParam> = {
	[MAINNET_CHAIN_HEX_ID]: {
		chainId: MAINNET_CHAIN_HEX_ID,
		rpcUrls: [MAINNET_RPC_URL],
		chainName: 'Ethereum Mainnet',
		nativeCurrency: { name: 'Ethereum', decimals: 18, symbol: 'ETH' },
		blockExplorerUrls: [ETHER_SCAN_URL]
	},
	[MVM_CHAIN_HEX_ID]: {
		chainId: MVM_CHAIN_HEX_ID,
		rpcUrls: [MVM_RPC_URL],
		chainName: 'Mixin Virtual Machine',
		nativeCurrency: { name: 'Ethereum', decimals: 18, symbol: 'ETH' },
		blockExplorerUrls: [MVM_SCAN_URL]
	}
};