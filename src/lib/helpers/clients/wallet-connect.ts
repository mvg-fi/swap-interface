import { INFURA_KEY } from '$lib/helpers/constants';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { MAINNET_RPC_URL, MVM_RPC_URL } from '$lib/helpers/constants'

const ConnectToWalletConnect = async () => {
	const provider = new WalletConnectProvider({
		bridge: 'https://bridge.walletconnect.org',
		qrcode: true,
		infuraId: INFURA_KEY,
		rpc: {
			1: MAINNET_RPC_URL,
			73927: MVM_RPC_URL,
		},
		chainId: 1,
		qrcodeModalOptions: undefined
	});

	await provider.enable();
	return provider;
};

export default ConnectToWalletConnect;