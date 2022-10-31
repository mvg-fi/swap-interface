import type { ethers } from 'ethers';

export type ProviderKey = 'injected' | 'walletlink' | 'walletconnect' | 'venly';

export type Provider = (ethers.providers.ExternalProvider | ethers.providers.JsonRpcFetchFunc) &
	ethers.providers.Web3Provider;

export interface IProvider {
  key: ProviderKey;
  title: string;
  desc: string;
  icon: string;
}