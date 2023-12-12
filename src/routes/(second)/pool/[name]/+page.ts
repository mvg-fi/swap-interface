import { currentPool } from '$lib/stores/pool/pools';
import { error } from '@sveltejs/kit';
 
/** @type {import('./$types').PageLoad} */
export async function load({ params }:any) {
  if (!/[a-zA-Z]/.test(params.name)) throw error(404, 'Page Not found');

  // TODO: loading pool by id. Need to deal with fetchPoolList with init
}