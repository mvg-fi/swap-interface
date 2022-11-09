import { ethers } from 'ethers';
import { mvmProvider } from './index';
// import { STABLE_SWAP_ABI, CRYPTO_SWAP_ABI } from '$lib/constants/abis';
import { TEST_STABLE_SWAP_ADDRESS, TEST_TRICRYPTO_ADDRESS } from '$lib/constants/contracts';

// export const StableSwapContract = new ethers.Contract(
//   TEST_STABLE_SWAP_ADDRESS,
//   STABLE_SWAP_ABI,
//   mvmProvider
// )

// export const CryptoSwapContract = new ethers.Contract(
//   TEST_TRICRYPTO_ADDRESS,
//   CRYPTO_SWAP_ABI,
//   mvmProvider
// )

export const fetchDyFromContract = (from: object, to: object, amount: number) => {
  if (amount == 0 || amount == null) {return}
  console.log(from, to, amount)
}