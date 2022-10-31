import { derived } from '@square/svelte-store';
import { persistentWritable } from '../helpers/store/persistent';
import type { ProviderKey } from '$lib/types/provider';
import metaMask from '$lib/images/logo/metamask.svg';
import walletConnect from '$lib/images/logo/wallet-connect.svg';
import { PROVIDER_KEY } from '$lib/helpers/constants';
import { page } from '$app/stores';
import { dedupe } from '$lib/helpers/store/dedupe';
import { browser } from '$app/environment';

const persistentProviderKey = persistentWritable<ProviderKey | undefined>(PROVIDER_KEY, undefined);

export const providerKey = dedupe(
	derived(
		[persistentProviderKey, page],
		([$providerKey, $page]) => $providerKey || $page.data.provider
	)
);

export const setProviderKey = (provider: ProviderKey) => persistentProviderKey.set(provider);
export const clearLastProvider = () => {
	browser && localStorage.removeItem('walletconnect');
	persistentProviderKey.set(undefined);
};

export const providerName = derived(providerKey, ($providerKey) => {
	if ($providerKey === 'injected') return 'MetaMask';
	if ($providerKey === 'walletconnect') return 'WalletConnect';

	return undefined;
});

export const providerLogo = derived(providerKey, ($providerKey) => {
	if ($providerKey === 'injected') return metaMask;
	if ($providerKey === 'walletconnect') return walletConnect;

	return '';
});
