import { error } from '@sveltejs/kit';
 
/** @type {import('./$types').PageLoad} */
export function load({ params }:any) {
  if (!/[a-zA-Z]/.test(params.name)) throw error(404, 'Page Not found');
}