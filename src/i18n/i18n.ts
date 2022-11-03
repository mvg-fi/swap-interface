import { register, init, getLocaleFromNavigator } from 'svelte-i18n';

export const initi18n = async () => {
  register('en', () => import('./en.json'));
  register('zh', () => import('./zh.json'));
  return await Promise.allSettled([
    init({
      fallbackLocale: 'en',
      initialLocale: getLocaleFromNavigator(),
    })
  ])
}