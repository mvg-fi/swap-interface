import type { Provider, ProviderKey } from '$lib/types/provider';
import { providerKey, setProviderKey } from '$lib/stores/provider';
import { get } from '@square/svelte-store';

export const createWeb3Client = async (provider: ProviderKey = 'injected') => {
	let connect: () => Promise<unknown> | unknown;
	switch (provider) {
		case 'injected':
			connect = (await import('./injected')).default;
			break;
		case 'walletconnect':
			connect = (await import('./wallet-connect')).default;
			break;
		case 'mixinmessenger':
			connect = (await import('./mixin-messenger')).default;
			break;
		case 'fennec':
			break;
	}

	return {
		cacheConnect: async () => {
			const cache = get(providerKey);
			if (!cache) return;
			return (await createWeb3Client(cache)).connect();
		},
		connect: async () => {
			const p = await connect();
			setProviderKey(provider);
			return p as Provider;
		}
	};
};