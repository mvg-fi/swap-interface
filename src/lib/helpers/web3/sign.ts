import { ethers } from 'ethers';
import { REGISTRY_PID, STORAGE_ADDRESS } from '$lib/helpers/constants';

export const generateExtra = (action: string) => {
	const value = Buffer.from(action).toString('hex');
	const hash = ethers.utils.keccak256(`0x${value}`).slice(2);
	return `0x${REGISTRY_PID}${STORAGE_ADDRESS.toLowerCase().slice(2)}${hash}${value}`;
};