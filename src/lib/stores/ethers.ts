import { ethers } from 'ethers';
import curve from '@zed-wong/mvgswap';
import { setSwitchNeeded } from './connect';
import { clearLastProvider } from './provider';
import { MVM_RPC_URL } from '$lib/helpers/constants';
import { derived, get } from '@square/svelte-store';
import { deepWritable } from '$lib/helpers/store/deep';
import { mainPools, factoryPools, cryptoFactoryPools, poolsLoaded } from "$lib/stores/pool/pools";

interface EtherStore {
	library?: ethers.providers.Web3Provider;
	provider?: ethers.providers.Web3Provider;
	chainId?: number;
	account?: `0x${string}`;
	// network?: string;
}

const store = deepWritable<EtherStore>({});

export const setProvider = async (
	provider: (ethers.providers.ExternalProvider | ethers.providers.JsonRpcFetchFunc) &
		ethers.providers.Web3Provider
) => {
	const library: ethers.providers.Web3Provider = new ethers.providers.Web3Provider(provider, 'any');
	const accounts = (await library.listAccounts()) as `0x${string}`[];
	const network = await library.getNetwork();

	const handleChainChanged = (chainId: number) => {
		store.set({
			...get(store),
			chainId: chainId
		});
		if (chainId != Number(73927)) {
			setSwitchNeeded(true)
		} else {
			setSwitchNeeded(false)
		}
	};

	const handleDisconnect = () => {
		clearLastProvider();
		store.set({});
	};

	const handleAccountsChanged = async (accounts: `0x${string}`[] | undefined) => {
		// TODO: account change must re-init curve
		if (!accounts || !accounts.length) {
			handleDisconnect();
			return;
		}
		store.set({
			...get(store),
			account: accounts[0]
		});
		await curve.init("JsonRpc", { url: MVM_RPC_URL }, { chainId: 73927 })
		await curve.fetchFactoryPools()
		await curve.fetchCryptoFactoryPools()

		mainPools.set(curve.getAllMainPools())
		factoryPools.set(curve.getAllFactoryPools())
		cryptoFactoryPools.set(curve.getAllCryptoFactoryPools())
		poolsLoaded.set(true)
	};

	get(store).provider?.removeAllListeners();

	store.set({
		provider,
		library,
		account: accounts[0],
		chainId: network.chainId
	});

	provider.on('accountsChanged', handleAccountsChanged);
	provider.on('chainChanged', handleChainChanged);
};

export const provider = derived(store, ($store) => $store.provider);
export const library = derived(store, ($store) => $store.library);
export const chainId = derived(store, ($store) => $store.chainId);
export const account = derived(store, ($store) => $store.account);