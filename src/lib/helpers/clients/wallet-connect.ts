import { INFURA_KEY, WALLET_CONNECT_KEY } from '$lib/helpers/constants';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { MAINNET_RPC_URL, MVM_RPC_URL } from '$lib/helpers/constants'
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5'

const ConnectToWalletConnect = async () => {
	// const provider = new WalletConnectProvider({
	// 	bridge: 'https://bridge.walletconnect.org',
	// 	qrcode: true,
	// 	infuraId: INFURA_KEY,
	// 	rpc: {
	// 		1: MAINNET_RPC_URL,
	// 		73927: MVM_RPC_URL,
	// 	},
	// 	chainId: 1,
	// 	qrcodeModalOptions: undefined
	// });

	// await provider.enable();
	// return provider;

	const mainnet = {
		chainId: 1,
		name: 'Ethereum',
		currency: 'ETH',
		explorerUrl: 'https://etherscan.io',
		rpcUrl: 'https://cloudflare-eth.com'
	}
	const metadata = {
		name: 'MVG Swap',
		description: 'An AMM protocol on MVM',
		url: 'https://swap.mvg.fi',
		icons: [''],
	}
	const modal = createWeb3Modal({
		ethersConfig: defaultConfig({ metadata }),
		chains: [mainnet],
		projectId: WALLET_CONNECT_KEY
	})
	return modal.open()
};

export default ConnectToWalletConnect;