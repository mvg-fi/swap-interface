import { user } from './user';
import { get } from 'svelte/store';
import type { Asset } from '$lib/types/asset';
import { fetchAssets } from '$lib/helpers/mvm-api';
import { asyncDerived } from '@square/svelte-store';
import { deepWritable } from '$lib/stores/common/deep';
import { connected } from '$lib/stores/connect';
import { formatDecimals } from '$lib/helpers/utils';

export const assets = deepWritable<Asset[]>([], (set) => {
	const timer = setInterval(async () => {
		const { user } = await import('./user');
		const $user = get(user);
		if (!$user) return;
		// TODO: uncomment
		// const assets = await fetchAssets($user);
		// set(assets);
	}, 20000);

	return () => {
		clearInterval(timer);
	};
});

export const updateAssets = async () => {
	const { user } = await import('./user');
	const $user = get(user);
	if (!$user) return;
	const $assets = await fetchAssets($user);
	assets.set($assets);
};

export const getCachedAssetBalance = (assetId: string) => {
	return asyncDerived([assets, user, connected], async ([$assets, $user, $connected]) => {
		const ass = $assets.find((ass) => { return ass.mixinAssetId === assetId || ass.contract === assetId })
		return ass?.symbol === 'ETH' 
		? formatDecimals(String(ass.balance), 8) || 0 
		: $assets.find((ass) => { return ass.mixinAssetId === assetId || ass.contract === assetId})?.balance || 0
	})
}