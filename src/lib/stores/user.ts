import { page } from '$app/stores';
import { derived, get } from '@square/svelte-store';
import { register } from '$lib/helpers/mvm-api';
import type { User } from '../types/user';
import { account } from './ethers';
import { clearLastProvider } from './provider';
import { LANG, USER_KEY } from '$lib/helpers/constants';
import { dedupe } from '../helpers/store/dedupe';
import { invalidateAll } from '$app/navigation';
import { setConnected } from './connect';
import { jsonPersistentEncoder, persistentWritable } from '../helpers/store/persistent';

const persistentUser = persistentWritable<User | undefined>(
	USER_KEY,
	undefined,
	jsonPersistentEncoder
);

// const persistentLang = persistentWritable<Locales | undefined>(LANG, undefined);

// export const switchLang = async (lang: Locales) => {
// 	if (!browser) return;
// 	if (get(locale) === lang) return;

// 	await loadLocaleAsync(lang);

// 	persistentLang.set(lang);
// 	setLocale(lang);

// 	document.querySelector('html')?.setAttribute('lang', lang);
// };

// export const lang = derived(persistentLang, (lang) => lang);

export const user = dedupe(
	derived([persistentUser, page], ([$user, $page]) => $user || $page.data.user)
);

export const registerAndSave = async (address: `0x${string}`) => {
	const u = await register(address);
	return persistentUser.set({
		...u,
		address
	});
};

export const logout = async () => {
	setConnected(false);
	await invalidateAll();
	persistentUser.set(undefined);
	clearLastProvider();
};

export const legalUser = derived([persistentUser, account], ([$user, $account]) => {
	return $user && $user.address === $account;
});

export const address = derived(user, ($user) => $user?.address);
export const userKey = derived(user, ($user) => $user.key);

export const shortAddress = derived(address, ($address) => {
	if (!$address) return;
	return $address.slice(0, 6) + '...' + $address.slice(-4);
});
