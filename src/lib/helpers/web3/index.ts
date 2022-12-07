import { ethers, utils, type BigNumberish } from 'ethers';
import ERC20_ABI from '$lib/constants/abis/erc20.json';
import {
  ETH_ASSET_ID,
  MAINNET_CHAIN_HEX_ID,
  MVM_CHAIN_HEX_ID,
  MVM_RPC_URL,
  networkParams
} from '$lib/helpers/constants';
import { format8Decimals } from '$lib/helpers/utils';
import type { Network } from '$lib/types/network';
import type { Asset } from '$lib/types/asset';
import { format } from '$lib/helpers/web3/big';

export const mainnetProvider = ethers.getDefaultProvider(1);
export const mvmProvider = ethers.getDefaultProvider(MVM_RPC_URL);

export const getBalance = async ({
  account,
  network = 'mvm',
  unitName = 18
}: {
  account: string;
  network: Network;
  unitName?: BigNumberish;
}) => {
  const provider = network === 'mainnet' ? mainnetProvider : mvmProvider;
  const balance = await provider.getBalance(account);
  return utils.formatUnits(balance, unitName);
};

export const getERC20Balance = async ({
  account,
  contractAddress,
  network = 'mvm'
}: {
  account: string;
  contractAddress: string;
  network: Network;
}) => {
  const provider = network === 'mainnet' ? mainnetProvider : mvmProvider;
  const contract = new ethers.Contract(contractAddress, ERC20_ABI, provider);
  const decimals = await contract.decimals();
  const balance = await contract.balanceOf(account);
  return utils.formatUnits(balance, decimals);
};

export const getAssetBalance = async (
  assets: Asset[],
  assetId: string,
  address: string,
  network: Network = 'mvm'
) => {
  if (assetId === ETH_ASSET_ID) return format8Decimals(await getBalance({ account: address, network }));

  const asset = assets.find((a) => a.mixinAssetId === assetId);
  const contract = network === 'mvm' ? asset?.contract : '';
  if (!contract) return '0';

  const balance = await getERC20Balance({
    account: address,
    contractAddress: contract,
    network
  });

  return format({ n: balance, dp: 8, fixed: false });
};

export const switchNetwork = async (provider: ethers.providers.Web3Provider, network: Network) => {
  const request = provider.provider.request;
  if (!request) throw new Error('Web3Provider.provider.request must be defined');

  const hex = network === 'mainnet' ? MAINNET_CHAIN_HEX_ID : MVM_CHAIN_HEX_ID;

  try {
    await request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: hex }]
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (switchError: any) {
    if (
      !(
        switchError?.code === 4902 ||
        switchError?.code === -32603 ||
        switchError?.data?.orginalError?.code === 4902 ||
        switchError?.data?.orginalError?.code === -32603
      )
    )
      return;
    await request({
      method: 'wallet_addEthereumChain',
      params: [networkParams[hex]]
    });
    await switchNetwork(provider, network);
  }
};