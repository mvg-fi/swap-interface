import { INFURA_KEY } from '$lib/helpers/constants';
import WalletConnectProvider from '@walletconnect/web3-provider';

const ConnectToWalletConnect = async () => {
	const provider = new WalletConnectProvider({
		bridge: 'https://bridge.walletconnect.org',
		qrcode: true,
		infuraId: INFURA_KEY,
		rpc: undefined,
		chainId: 1,
		qrcodeModalOptions: undefined
	});

	await provider.enable();
	return provider;
};

export default ConnectToWalletConnect;