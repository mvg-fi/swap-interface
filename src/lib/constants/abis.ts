export const ERC20_ABI = [
	{
		type: 'constructor',
		stateMutability: 'nonpayable',
		inputs: [
			{ type: 'uint128', name: '_id', internalType: 'uint128' },
			{ type: 'string', name: '_name', internalType: 'string' },
			{ type: 'string', name: '_symbol', internalType: 'string' }
		]
	},
	{
		type: 'event',
		name: 'Approval',
		inputs: [
			{
				type: 'address',
				name: 'owner',
				internalType: 'address',
				indexed: true
			},
			{
				type: 'address',
				name: 'spender',
				internalType: 'address',
				indexed: true
			},
			{
				type: 'uint256',
				name: 'value',
				internalType: 'uint256',
				indexed: false
			}
		],
		anonymous: false
	},
	{
		type: 'event',
		name: 'Transfer',
		inputs: [
			{
				type: 'address',
				name: 'from',
				internalType: 'address',
				indexed: true
			},
			{
				type: 'address',
				name: 'to',
				internalType: 'address',
				indexed: true
			},
			{
				type: 'uint256',
				name: 'value',
				internalType: 'uint256',
				indexed: false
			}
		],
		anonymous: false
	},
	{
		type: 'function',
		stateMutability: 'view',
		outputs: [{ type: 'uint256', name: 'remaining', internalType: 'uint256' }],
		name: 'allowance',
		inputs: [
			{ type: 'address', name: '_owner', internalType: 'address' },
			{ type: 'address', name: '_spender', internalType: 'address' }
		]
	},
	{
		type: 'function',
		stateMutability: 'nonpayable',
		outputs: [{ type: 'bool', name: '', internalType: 'bool' }],
		name: 'approve',
		inputs: [
			{ type: 'address', name: '_spender', internalType: 'address' },
			{ type: 'uint256', name: '_value', internalType: 'uint256' }
		]
	},
	{
		type: 'function',
		stateMutability: 'view',
		outputs: [{ type: 'uint256', name: 'balance', internalType: 'uint256' }],
		name: 'balanceOf',
		inputs: [{ type: 'address', name: '_owner', internalType: 'address' }]
	},
	{
		type: 'function',
		stateMutability: 'nonpayable',
		outputs: [],
		name: 'burn',
		inputs: [
			{ type: 'address', name: 'to', internalType: 'address' },
			{ type: 'uint256', name: 'value', internalType: 'uint256' }
		]
	},
	{
		type: 'function',
		stateMutability: 'view',
		outputs: [{ type: 'uint8', name: '', internalType: 'uint8' }],
		name: 'decimals',
		inputs: []
	},
	{
		type: 'function',
		stateMutability: 'view',
		outputs: [{ type: 'uint128', name: '', internalType: 'uint128' }],
		name: 'id',
		inputs: []
	},
	{
		type: 'function',
		stateMutability: 'nonpayable',
		outputs: [],
		name: 'mint',
		inputs: [
			{ type: 'address', name: 'to', internalType: 'address' },
			{ type: 'uint256', name: 'value', internalType: 'uint256' }
		]
	},
	{
		type: 'function',
		stateMutability: 'view',
		outputs: [{ type: 'string', name: '', internalType: 'string' }],
		name: 'name',
		inputs: []
	},
	{
		type: 'function',
		stateMutability: 'view',
		outputs: [{ type: 'address', name: '', internalType: 'address' }],
		name: 'registry',
		inputs: []
	},
	{
		type: 'function',
		stateMutability: 'view',
		outputs: [{ type: 'string', name: '', internalType: 'string' }],
		name: 'symbol',
		inputs: []
	},
	{
		type: 'function',
		stateMutability: 'view',
		outputs: [{ type: 'uint256', name: '', internalType: 'uint256' }],
		name: 'totalSupply',
		inputs: []
	},
	{
		type: 'function',
		stateMutability: 'nonpayable',
		outputs: [{ type: 'bool', name: '', internalType: 'bool' }],
		name: 'transfer',
		inputs: [
			{ type: 'address', name: 'to', internalType: 'address' },
			{ type: 'uint256', name: 'value', internalType: 'uint256' }
		]
	},
	{
		type: 'function',
		stateMutability: 'nonpayable',
		outputs: [{ type: 'bool', name: '', internalType: 'bool' }],
		name: 'transferFrom',
		inputs: [
			{ type: 'address', name: 'from', internalType: 'address' },
			{ type: 'address', name: 'to', internalType: 'address' },
			{ type: 'uint256', name: 'value', internalType: 'uint256' }
		]
	},
	{
		type: 'function',
		stateMutability: 'nonpayable',
		outputs: [{ type: 'bool', name: '', internalType: 'bool' }],
		name: 'transferWithExtra',
		inputs: [
			{ type: 'address', name: 'to', internalType: 'address' },
			{ type: 'uint256', name: 'value', internalType: 'uint256' },
			{ type: 'bytes', name: 'extra', internalType: 'bytes' }
		]
	}
];

export const MVM_ERC20_ABI = [
	{
		type: 'constructor',
		stateMutability: 'nonpayable',
		inputs: [
			{ type: 'uint128', name: '_id', internalType: 'uint128' },
			{ type: 'string', name: '_name', internalType: 'string' },
			{ type: 'string', name: '_symbol', internalType: 'string' }
		]
	},
	{
		type: 'event',
		name: 'Approval',
		inputs: [
			{
				type: 'address',
				name: 'owner',
				internalType: 'address',
				indexed: true
			},
			{
				type: 'address',
				name: 'spender',
				internalType: 'address',
				indexed: true
			},
			{
				type: 'uint256',
				name: 'value',
				internalType: 'uint256',
				indexed: false
			}
		],
		anonymous: false
	},
	{
		type: 'event',
		name: 'Transfer',
		inputs: [
			{
				type: 'address',
				name: 'from',
				internalType: 'address',
				indexed: true
			},
			{
				type: 'address',
				name: 'to',
				internalType: 'address',
				indexed: true
			},
			{
				type: 'uint256',
				name: 'value',
				internalType: 'uint256',
				indexed: false
			}
		],
		anonymous: false
	},
	{
		type: 'function',
		stateMutability: 'view',
		outputs: [{ type: 'uint256', name: 'remaining', internalType: 'uint256' }],
		name: 'allowance',
		inputs: [
			{ type: 'address', name: '_owner', internalType: 'address' },
			{ type: 'address', name: '_spender', internalType: 'address' }
		]
	},
	{
		type: 'function',
		stateMutability: 'nonpayable',
		outputs: [{ type: 'bool', name: '', internalType: 'bool' }],
		name: 'approve',
		inputs: [
			{ type: 'address', name: '_spender', internalType: 'address' },
			{ type: 'uint256', name: '_value', internalType: 'uint256' }
		]
	},
	{
		type: 'function',
		stateMutability: 'view',
		outputs: [{ type: 'uint256', name: 'balance', internalType: 'uint256' }],
		name: 'balanceOf',
		inputs: [{ type: 'address', name: '_owner', internalType: 'address' }]
	},
	{
		type: 'function',
		stateMutability: 'nonpayable',
		outputs: [],
		name: 'burn',
		inputs: [
			{ type: 'address', name: 'to', internalType: 'address' },
			{ type: 'uint256', name: 'value', internalType: 'uint256' }
		]
	},
	{
		type: 'function',
		stateMutability: 'view',
		outputs: [{ type: 'uint8', name: '', internalType: 'uint8' }],
		name: 'decimals',
		inputs: []
	},
	{
		type: 'function',
		stateMutability: 'view',
		outputs: [{ type: 'uint128', name: '', internalType: 'uint128' }],
		name: 'id',
		inputs: []
	},
	{
		type: 'function',
		stateMutability: 'nonpayable',
		outputs: [],
		name: 'mint',
		inputs: [
			{ type: 'address', name: 'to', internalType: 'address' },
			{ type: 'uint256', name: 'value', internalType: 'uint256' }
		]
	},
	{
		type: 'function',
		stateMutability: 'view',
		outputs: [{ type: 'string', name: '', internalType: 'string' }],
		name: 'name',
		inputs: []
	},
	{
		type: 'function',
		stateMutability: 'view',
		outputs: [{ type: 'address', name: '', internalType: 'address' }],
		name: 'registry',
		inputs: []
	},
	{
		type: 'function',
		stateMutability: 'view',
		outputs: [{ type: 'string', name: '', internalType: 'string' }],
		name: 'symbol',
		inputs: []
	},
	{
		type: 'function',
		stateMutability: 'view',
		outputs: [{ type: 'uint256', name: '', internalType: 'uint256' }],
		name: 'totalSupply',
		inputs: []
	},
	{
		type: 'function',
		stateMutability: 'nonpayable',
		outputs: [{ type: 'bool', name: '', internalType: 'bool' }],
		name: 'transfer',
		inputs: [
			{ type: 'address', name: 'to', internalType: 'address' },
			{ type: 'uint256', name: 'value', internalType: 'uint256' }
		]
	},
	{
		type: 'function',
		stateMutability: 'nonpayable',
		outputs: [{ type: 'bool', name: '', internalType: 'bool' }],
		name: 'transferFrom',
		inputs: [
			{ type: 'address', name: 'from', internalType: 'address' },
			{ type: 'address', name: 'to', internalType: 'address' },
			{ type: 'uint256', name: 'value', internalType: 'uint256' }
		]
	},
	{
		type: 'function',
		stateMutability: 'nonpayable',
		outputs: [{ type: 'bool', name: '', internalType: 'bool' }],
		name: 'transferWithExtra',
		inputs: [
			{ type: 'address', name: 'to', internalType: 'address' },
			{ type: 'uint256', name: 'value', internalType: 'uint256' },
			{ type: 'bytes', name: 'extra', internalType: 'bytes' }
		]
	}
];

export const REGISTRY_ABI = [
	{
		type: 'constructor',
		stateMutability: 'nonpayable',
		inputs: [
			{ type: 'bytes', name: 'raw', internalType: 'bytes' },
			{ type: 'uint128', name: 'pid', internalType: 'uint128' }
		]
	},
	{
		type: 'event',
		name: 'AssetCreated',
		inputs: [
			{ type: 'address', name: 'at', internalType: 'address', indexed: true },
			{ type: 'uint256', name: 'id', internalType: 'uint256', indexed: false }
		],
		anonymous: false
	},
	{
		type: 'event',
		name: 'Halted',
		inputs: [{ type: 'bool', name: 'state', internalType: 'bool', indexed: false }],
		anonymous: false
	},
	{
		type: 'event',
		name: 'Iterated',
		inputs: [
			{ type: 'uint256[4]', name: 'from', internalType: 'uint256[4]', indexed: false },
			{ type: 'uint256[4]', name: 'to', internalType: 'uint256[4]', indexed: false }
		],
		anonymous: false
	},
	{
		type: 'event',
		name: 'MixinEvent',
		inputs: [
			{ type: 'uint64', name: 'nonce', internalType: 'uint64', indexed: true },
			{ type: 'address', name: 'user', internalType: 'address', indexed: true },
			{ type: 'address', name: 'asset', internalType: 'address', indexed: true },
			{ type: 'uint256', name: 'amount', internalType: 'uint256', indexed: false },
			{ type: 'bytes', name: 'extra', internalType: 'bytes', indexed: false },
			{ type: 'uint64', name: 'timestamp', internalType: 'uint64', indexed: false }
		],
		anonymous: false
	},
	{
		type: 'event',
		name: 'MixinTransaction',
		inputs: [{ type: 'bytes', name: 'raw', internalType: 'bytes', indexed: false }],
		anonymous: false
	},
	{
		type: 'event',
		name: 'UserCreated',
		inputs: [
			{ type: 'address', name: 'at', internalType: 'address', indexed: true },
			{ type: 'bytes', name: 'members', internalType: 'bytes', indexed: false }
		],
		anonymous: false
	},
	{
		type: 'function',
		stateMutability: 'view',
		outputs: [{ type: 'uint256', name: '', internalType: 'uint256' }],
		name: 'GROUP',
		inputs: [{ type: 'uint256', name: '', internalType: 'uint256' }]
	},
	{
		type: 'function',
		stateMutability: 'view',
		outputs: [{ type: 'bool', name: '', internalType: 'bool' }],
		name: 'HALTED',
		inputs: []
	},
	{
		type: 'function',
		stateMutability: 'view',
		outputs: [{ type: 'uint64', name: '', internalType: 'uint64' }],
		name: 'INBOUND',
		inputs: []
	},
	{
		type: 'function',
		stateMutability: 'view',
		outputs: [{ type: 'uint64', name: '', internalType: 'uint64' }],
		name: 'OUTBOUND',
		inputs: []
	},
	{
		type: 'function',
		stateMutability: 'view',
		outputs: [{ type: 'uint128', name: '', internalType: 'uint128' }],
		name: 'PID',
		inputs: []
	},
	{
		type: 'function',
		stateMutability: 'view',
		outputs: [{ type: 'uint256', name: '', internalType: 'uint256' }],
		name: 'VERSION',
		inputs: []
	},
	{
		type: 'function',
		stateMutability: 'view',
		outputs: [{ type: 'uint128', name: '', internalType: 'uint128' }],
		name: 'assets',
		inputs: [{ type: 'address', name: '', internalType: 'address' }]
	},
	{
		type: 'function',
		stateMutability: 'view',
		outputs: [{ type: 'uint256', name: '', internalType: 'uint256' }],
		name: 'balances',
		inputs: [{ type: 'uint128', name: '', internalType: 'uint128' }]
	},
	{
		type: 'function',
		stateMutability: 'nonpayable',
		outputs: [{ type: 'bool', name: '', internalType: 'bool' }],
		name: 'burn',
		inputs: [
			{ type: 'address', name: 'user', internalType: 'address' },
			{ type: 'uint256', name: 'amount', internalType: 'uint256' },
			{ type: 'bytes', name: 'extra', internalType: 'bytes' }
		]
	},
	{
		type: 'function',
		stateMutability: 'nonpayable',
		outputs: [{ type: 'bool', name: '', internalType: 'bool' }],
		name: 'claim',
		inputs: [
			{ type: 'address', name: 'asset', internalType: 'address' },
			{ type: 'uint256', name: 'amount', internalType: 'uint256' }
		]
	},
	{
		type: 'function',
		stateMutability: 'view',
		outputs: [{ type: 'address', name: '', internalType: 'address' }],
		name: 'contracts',
		inputs: [{ type: 'uint256', name: '', internalType: 'uint256' }]
	},
	{
		type: 'function',
		stateMutability: 'nonpayable',
		outputs: [],
		name: 'halt',
		inputs: [{ type: 'bytes', name: 'raw', internalType: 'bytes' }]
	},
	{
		type: 'function',
		stateMutability: 'nonpayable',
		outputs: [],
		name: 'iterate',
		inputs: [{ type: 'bytes', name: 'raw', internalType: 'bytes' }]
	},
	{
		type: 'function',
		stateMutability: 'nonpayable',
		outputs: [{ type: 'bool', name: '', internalType: 'bool' }],
		name: 'mixin',
		inputs: [{ type: 'bytes', name: 'raw', internalType: 'bytes' }]
	},
	{
		type: 'function',
		stateMutability: 'view',
		outputs: [{ type: 'bytes', name: '', internalType: 'bytes' }],
		name: 'users',
		inputs: [{ type: 'address', name: '', internalType: 'address' }]
	}
];

export const BRIDGE_ABI = [
	{
		type: 'constructor',
		stateMutability: 'nonpayable',
		inputs: [
			{ type: 'address', name: 'factory', internalType: 'address' },
			{ type: 'address', name: 'xin', internalType: 'address' }
		]
	},
	{
		type: 'event',
		name: 'Bound',
		inputs: [
			{
				type: 'address',
				name: 'from',
				internalType: 'address',
				indexed: true
			},
			{
				type: 'address',
				name: 'to',
				internalType: 'address',
				indexed: true
			}
		],
		anonymous: false
	},
	{
		type: 'event',
		name: 'Through',
		inputs: [
			{
				type: 'address',
				name: 'asset',
				internalType: 'address',
				indexed: true
			},
			{
				type: 'address',
				name: 'from',
				internalType: 'address',
				indexed: true
			},
			{
				type: 'address',
				name: 'to',
				internalType: 'address',
				indexed: true
			},
			{
				type: 'uint256',
				name: 'amount',
				internalType: 'uint256',
				indexed: false
			}
		],
		anonymous: false
	},
	{
		type: 'event',
		name: 'Vault',
		inputs: [
			{
				type: 'address',
				name: 'from',
				internalType: 'address',
				indexed: true
			},
			{
				type: 'uint256',
				name: 'amount',
				internalType: 'uint256',
				indexed: false
			}
		],
		anonymous: false
	},
	{
		type: 'function',
		stateMutability: 'view',
		outputs: [{ type: 'uint256', name: '', internalType: 'uint256' }],
		name: 'BASE',
		inputs: []
	},
	{
		type: 'function',
		stateMutability: 'view',
		outputs: [{ type: 'address', name: '', internalType: 'address' }],
		name: 'FACTORY',
		inputs: []
	},
	{
		type: 'function',
		stateMutability: 'view',
		outputs: [{ type: 'address', name: '', internalType: 'address' }],
		name: 'OWNER',
		inputs: []
	},
	{
		type: 'function',
		stateMutability: 'view',
		outputs: [{ type: 'address', name: '', internalType: 'address' }],
		name: 'XIN',
		inputs: []
	},
	{
		type: 'function',
		stateMutability: 'nonpayable',
		outputs: [],
		name: 'bind',
		inputs: [{ type: 'address', name: 'receiver', internalType: 'address' }]
	},
	{
		type: 'function',
		stateMutability: 'view',
		outputs: [{ type: 'address', name: '', internalType: 'address' }],
		name: 'bridges',
		inputs: [{ type: 'address', name: '', internalType: 'address' }]
	},
	{
		type: 'function',
		stateMutability: 'nonpayable',
		outputs: [],
		name: 'pass',
		inputs: [
			{ type: 'address', name: 'asset', internalType: 'address' },
			{ type: 'uint256', name: 'amount', internalType: 'uint256' }
		]
	},
	{
		type: 'function',
		stateMutability: 'payable',
		outputs: [],
		name: 'release',
		inputs: [
			{ type: 'address', name: 'receiver', internalType: 'address' },
			{ type: 'bytes', name: 'input', internalType: 'bytes' }
		]
	},
	{
		type: 'function',
		stateMutability: 'nonpayable',
		outputs: [],
		name: 'vault',
		inputs: [
			{ type: 'address', name: 'asset', internalType: 'address' },
			{ type: 'uint256', name: 'amount', internalType: 'uint256' }
		]
	},
	{ type: 'receive', stateMutability: 'payable' }
];

export const STABLE_SWAP_ABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "buyer",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "sold_id",
				"type": "int128"
			},
			{
				"indexed": false,
				"name": "tokens_sold",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "bought_id",
				"type": "int128"
			},
			{
				"indexed": false,
				"name": "tokens_bought",
				"type": "uint256"
			}
		],
		"name": "TokenExchange",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "provider",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "token_amounts",
				"type": "uint256[4]"
			},
			{
				"indexed": false,
				"name": "fees",
				"type": "uint256[4]"
			},
			{
				"indexed": false,
				"name": "invariant",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "token_supply",
				"type": "uint256"
			}
		],
		"name": "AddLiquidity",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "provider",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "token_amounts",
				"type": "uint256[4]"
			},
			{
				"indexed": false,
				"name": "fees",
				"type": "uint256[4]"
			},
			{
				"indexed": false,
				"name": "token_supply",
				"type": "uint256"
			}
		],
		"name": "RemoveLiquidity",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "provider",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "token_amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "coin_amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "token_supply",
				"type": "uint256"
			}
		],
		"name": "RemoveLiquidityOne",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "provider",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "token_amounts",
				"type": "uint256[4]"
			},
			{
				"indexed": false,
				"name": "fees",
				"type": "uint256[4]"
			},
			{
				"indexed": false,
				"name": "invariant",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "token_supply",
				"type": "uint256"
			}
		],
		"name": "RemoveLiquidityImbalance",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "deadline",
				"type": "uint256"
			},
			{
				"indexed": true,
				"name": "admin",
				"type": "address"
			}
		],
		"name": "CommitNewAdmin",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "admin",
				"type": "address"
			}
		],
		"name": "NewAdmin",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "deadline",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "fee",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "admin_fee",
				"type": "uint256"
			}
		],
		"name": "CommitNewFee",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "fee",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "admin_fee",
				"type": "uint256"
			}
		],
		"name": "NewFee",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "old_A",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "new_A",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "initial_time",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "future_time",
				"type": "uint256"
			}
		],
		"name": "RampA",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "A",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "t",
				"type": "uint256"
			}
		],
		"name": "StopRampA",
		"type": "event"
	},
	{
		"inputs": [
			{
				"name": "_owner",
				"type": "address"
			},
			{
				"name": "_coins",
				"type": "address[4]"
			},
			{
				"name": "_pool_token",
				"type": "address"
			},
			{
				"name": "_A",
				"type": "uint256"
			},
			{
				"name": "_fee",
				"type": "uint256"
			},
			{
				"name": "_admin_fee",
				"type": "uint256"
			}
		],
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"gas": 5174,
		"inputs": [],
		"name": "A",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"gas": 5136,
		"inputs": [],
		"name": "A_precise",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"gas": 1366335,
		"inputs": [],
		"name": "get_virtual_price",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"gas": 5437024,
		"inputs": [
			{
				"name": "_amounts",
				"type": "uint256[4]"
			},
			{
				"name": "_is_deposit",
				"type": "bool"
			}
		],
		"name": "calc_token_amount",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"gas": 8404587,
		"inputs": [
			{
				"name": "_amounts",
				"type": "uint256[4]"
			},
			{
				"name": "_min_mint_amount",
				"type": "uint256"
			}
		],
		"name": "add_liquidity",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"gas": 3158604,
		"inputs": [
			{
				"name": "i",
				"type": "int128"
			},
			{
				"name": "j",
				"type": "int128"
			},
			{
				"name": "_dx",
				"type": "uint256"
			}
		],
		"name": "get_dy",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"gas": 3321667,
		"inputs": [
			{
				"name": "i",
				"type": "int128"
			},
			{
				"name": "j",
				"type": "int128"
			},
			{
				"name": "_dx",
				"type": "uint256"
			},
			{
				"name": "_min_dy",
				"type": "uint256"
			}
		],
		"name": "exchange",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"gas": 251355,
		"inputs": [
			{
				"name": "_amount",
				"type": "uint256"
			},
			{
				"name": "_min_amounts",
				"type": "uint256[4]"
			}
		],
		"name": "remove_liquidity",
		"outputs": [
			{
				"name": "",
				"type": "uint256[4]"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"gas": 8403753,
		"inputs": [
			{
				"name": "_amounts",
				"type": "uint256[4]"
			},
			{
				"name": "_max_burn_amount",
				"type": "uint256"
			}
		],
		"name": "remove_liquidity_imbalance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"gas": 1254,
		"inputs": [
			{
				"name": "_token_amount",
				"type": "uint256"
			},
			{
				"name": "i",
				"type": "int128"
			}
		],
		"name": "calc_withdraw_one_coin",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"gas": 4597598,
		"inputs": [
			{
				"name": "_token_amount",
				"type": "uint256"
			},
			{
				"name": "i",
				"type": "int128"
			},
			{
				"name": "_min_amount",
				"type": "uint256"
			}
		],
		"name": "remove_liquidity_one_coin",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"gas": 151405,
		"inputs": [
			{
				"name": "_future_A",
				"type": "uint256"
			},
			{
				"name": "_future_time",
				"type": "uint256"
			}
		],
		"name": "ramp_A",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"gas": 148622,
		"inputs": [],
		"name": "stop_ramp_A",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"gas": 110855,
		"inputs": [
			{
				"name": "_new_fee",
				"type": "uint256"
			},
			{
				"name": "_new_admin_fee",
				"type": "uint256"
			}
		],
		"name": "commit_new_fee",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"gas": 97261,
		"inputs": [],
		"name": "apply_new_fee",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"gas": 21592,
		"inputs": [],
		"name": "revert_new_parameters",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"gas": 75890,
		"inputs": [
			{
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "commit_transfer_ownership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"gas": 61592,
		"inputs": [],
		"name": "apply_transfer_ownership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"gas": 21682,
		"inputs": [],
		"name": "revert_transfer_ownership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"gas": 3710,
		"inputs": [
			{
				"name": "i",
				"type": "uint256"
			}
		],
		"name": "admin_balances",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"gas": 29834,
		"inputs": [],
		"name": "withdraw_admin_fees",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"gas": 149638,
		"inputs": [],
		"name": "donate_admin_fees",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"gas": 37695,
		"inputs": [],
		"name": "kill_me",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"gas": 21832,
		"inputs": [],
		"name": "unkill_me",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"gas": 1853,
		"inputs": [
			{
				"name": "arg0",
				"type": "uint256"
			}
		],
		"name": "coins",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"gas": 1883,
		"inputs": [
			{
				"name": "arg0",
				"type": "uint256"
			}
		],
		"name": "balances",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"gas": 1868,
		"inputs": [],
		"name": "fee",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"gas": 1898,
		"inputs": [],
		"name": "admin_fee",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"gas": 1928,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"gas": 1958,
		"inputs": [],
		"name": "lp_token",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"gas": 1988,
		"inputs": [],
		"name": "initial_A",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"gas": 2018,
		"inputs": [],
		"name": "future_A",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"gas": 2048,
		"inputs": [],
		"name": "initial_A_time",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"gas": 2078,
		"inputs": [],
		"name": "future_A_time",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"gas": 2108,
		"inputs": [],
		"name": "admin_actions_deadline",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"gas": 2138,
		"inputs": [],
		"name": "transfer_ownership_deadline",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"gas": 2168,
		"inputs": [],
		"name": "future_fee",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"gas": 2198,
		"inputs": [],
		"name": "future_admin_fee",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"gas": 2228,
		"inputs": [],
		"name": "future_owner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

export const CRYPTO_SWAP_ABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "buyer",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "sold_id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "tokens_sold",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "bought_id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "tokens_bought",
				"type": "uint256"
			}
		],
		"name": "TokenExchange",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "provider",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "token_amounts",
				"type": "uint256[3]"
			},
			{
				"indexed": false,
				"name": "fee",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "token_supply",
				"type": "uint256"
			}
		],
		"name": "AddLiquidity",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "provider",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "token_amounts",
				"type": "uint256[3]"
			},
			{
				"indexed": false,
				"name": "token_supply",
				"type": "uint256"
			}
		],
		"name": "RemoveLiquidity",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "provider",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "token_amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "coin_index",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "coin_amount",
				"type": "uint256"
			}
		],
		"name": "RemoveLiquidityOne",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "deadline",
				"type": "uint256"
			},
			{
				"indexed": true,
				"name": "admin",
				"type": "address"
			}
		],
		"name": "CommitNewAdmin",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "admin",
				"type": "address"
			}
		],
		"name": "NewAdmin",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "deadline",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "admin_fee",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "mid_fee",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "out_fee",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "fee_gamma",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "allowed_extra_profit",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "adjustment_step",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "ma_half_time",
				"type": "uint256"
			}
		],
		"name": "CommitNewParameters",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "admin_fee",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "mid_fee",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "out_fee",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "fee_gamma",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "allowed_extra_profit",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "adjustment_step",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "ma_half_time",
				"type": "uint256"
			}
		],
		"name": "NewParameters",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "initial_A",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "future_A",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "initial_gamma",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "future_gamma",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "initial_time",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "future_time",
				"type": "uint256"
			}
		],
		"name": "RampAgamma",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "current_A",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "current_gamma",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "time",
				"type": "uint256"
			}
		],
		"name": "StopRampA",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "admin",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "tokens",
				"type": "uint256"
			}
		],
		"name": "ClaimAdminFee",
		"type": "event"
	},
	{
		"inputs": [
			{
				"name": "owner",
				"type": "address"
			},
			{
				"name": "admin_fee_receiver",
				"type": "address"
			},
			{
				"name": "A",
				"type": "uint256"
			},
			{
				"name": "gamma",
				"type": "uint256"
			},
			{
				"name": "mid_fee",
				"type": "uint256"
			},
			{
				"name": "out_fee",
				"type": "uint256"
			},
			{
				"name": "allowed_extra_profit",
				"type": "uint256"
			},
			{
				"name": "fee_gamma",
				"type": "uint256"
			},
			{
				"name": "adjustment_step",
				"type": "uint256"
			},
			{
				"name": "admin_fee",
				"type": "uint256"
			},
			{
				"name": "ma_half_time",
				"type": "uint256"
			},
			{
				"name": "initial_prices",
				"type": "uint256[2]"
			}
		],
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"gas": 1889,
		"inputs": [
			{
				"name": "k",
				"type": "uint256"
			}
		],
		"name": "price_oracle",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"gas": 1919,
		"inputs": [
			{
				"name": "k",
				"type": "uint256"
			}
		],
		"name": "price_scale",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"gas": 1949,
		"inputs": [
			{
				"name": "k",
				"type": "uint256"
			}
		],
		"name": "last_prices",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"gas": 540,
		"inputs": [],
		"name": "token",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"gas": 684,
		"inputs": [
			{
				"name": "i",
				"type": "uint256"
			}
		],
		"name": "coins",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"gas": 703,
		"inputs": [],
		"name": "A",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"gas": 6160,
		"inputs": [],
		"name": "gamma",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"gas": 10508,
		"inputs": [],
		"name": "fee",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"gas": 5499,
		"inputs": [
			{
				"name": "xp",
				"type": "uint256[3]"
			}
		],
		"name": "fee_calc",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"gas": 5841,
		"inputs": [],
		"name": "get_virtual_price",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"gas": 715469,
		"inputs": [
			{
				"name": "i",
				"type": "uint256"
			},
			{
				"name": "j",
				"type": "uint256"
			},
			{
				"name": "dx",
				"type": "uint256"
			},
			{
				"name": "min_dy",
				"type": "uint256"
			}
		],
		"name": "exchange",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"gas": 715469,
		"inputs": [
			{
				"name": "i",
				"type": "uint256"
			},
			{
				"name": "j",
				"type": "uint256"
			},
			{
				"name": "dx",
				"type": "uint256"
			},
			{
				"name": "min_dy",
				"type": "uint256"
			},
			{
				"name": "use_eth",
				"type": "bool"
			}
		],
		"name": "exchange",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"gas": 1808,
		"inputs": [
			{
				"name": "i",
				"type": "uint256"
			},
			{
				"name": "j",
				"type": "uint256"
			},
			{
				"name": "dx",
				"type": "uint256"
			}
		],
		"name": "get_dy",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"gas": 9769,
		"inputs": [
			{
				"name": "amounts",
				"type": "uint256[3]"
			},
			{
				"name": "xp",
				"type": "uint256[3]"
			}
		],
		"name": "calc_token_fee",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"gas": 660697,
		"inputs": [
			{
				"name": "amounts",
				"type": "uint256[3]"
			},
			{
				"name": "min_mint_amount",
				"type": "uint256"
			}
		],
		"name": "add_liquidity",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"gas": 213947,
		"inputs": [
			{
				"name": "_amount",
				"type": "uint256"
			},
			{
				"name": "min_amounts",
				"type": "uint256[3]"
			}
		],
		"name": "remove_liquidity",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"gas": 2124,
		"inputs": [
			{
				"name": "amounts",
				"type": "uint256[3]"
			},
			{
				"name": "deposit",
				"type": "bool"
			}
		],
		"name": "calc_token_amount",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"gas": 6928,
		"inputs": [
			{
				"name": "token_amount",
				"type": "uint256"
			},
			{
				"name": "i",
				"type": "uint256"
			}
		],
		"name": "calc_withdraw_one_coin",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"gas": 579383,
		"inputs": [
			{
				"name": "token_amount",
				"type": "uint256"
			},
			{
				"name": "i",
				"type": "uint256"
			},
			{
				"name": "min_amount",
				"type": "uint256"
			}
		],
		"name": "remove_liquidity_one_coin",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"gas": 331224,
		"inputs": [],
		"name": "claim_admin_fees",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"gas": 153264,
		"inputs": [
			{
				"name": "future_A",
				"type": "uint256"
			},
			{
				"name": "future_gamma",
				"type": "uint256"
			},
			{
				"name": "future_time",
				"type": "uint256"
			}
		],
		"name": "ramp_A_gamma",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"gas": 149873,
		"inputs": [],
		"name": "stop_ramp_A_gamma",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"gas": 293438,
		"inputs": [
			{
				"name": "_new_mid_fee",
				"type": "uint256"
			},
			{
				"name": "_new_out_fee",
				"type": "uint256"
			},
			{
				"name": "_new_admin_fee",
				"type": "uint256"
			},
			{
				"name": "_new_fee_gamma",
				"type": "uint256"
			},
			{
				"name": "_new_allowed_extra_profit",
				"type": "uint256"
			},
			{
				"name": "_new_adjustment_step",
				"type": "uint256"
			},
			{
				"name": "_new_ma_half_time",
				"type": "uint256"
			}
		],
		"name": "commit_new_parameters",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"gas": 609122,
		"inputs": [],
		"name": "apply_new_parameters",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"gas": 21931,
		"inputs": [],
		"name": "revert_new_parameters",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"gas": 76266,
		"inputs": [
			{
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "commit_transfer_ownership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"gas": 61934,
		"inputs": [],
		"name": "apply_transfer_ownership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"gas": 22021,
		"inputs": [],
		"name": "revert_transfer_ownership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"gas": 37944,
		"inputs": [],
		"name": "kill_me",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"gas": 22081,
		"inputs": [],
		"name": "unkill_me",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"gas": 37265,
		"inputs": [
			{
				"name": "_admin_fee_receiver",
				"type": "address"
			}
		],
		"name": "set_admin_fee_receiver",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"gas": 2150,
		"inputs": [],
		"name": "last_prices_timestamp",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"gas": 2180,
		"inputs": [],
		"name": "initial_A_gamma",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"gas": 2210,
		"inputs": [],
		"name": "future_A_gamma",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"gas": 2240,
		"inputs": [],
		"name": "initial_A_gamma_time",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"gas": 2270,
		"inputs": [],
		"name": "future_A_gamma_time",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"gas": 2300,
		"inputs": [],
		"name": "allowed_extra_profit",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"gas": 2330,
		"inputs": [],
		"name": "future_allowed_extra_profit",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"gas": 2360,
		"inputs": [],
		"name": "fee_gamma",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"gas": 2390,
		"inputs": [],
		"name": "future_fee_gamma",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"gas": 2420,
		"inputs": [],
		"name": "adjustment_step",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"gas": 2450,
		"inputs": [],
		"name": "future_adjustment_step",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"gas": 2480,
		"inputs": [],
		"name": "ma_half_time",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"gas": 2510,
		"inputs": [],
		"name": "future_ma_half_time",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"gas": 2540,
		"inputs": [],
		"name": "mid_fee",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"gas": 2570,
		"inputs": [],
		"name": "out_fee",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"gas": 2600,
		"inputs": [],
		"name": "admin_fee",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"gas": 2630,
		"inputs": [],
		"name": "future_mid_fee",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"gas": 2660,
		"inputs": [],
		"name": "future_out_fee",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"gas": 2690,
		"inputs": [],
		"name": "future_admin_fee",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"gas": 2765,
		"inputs": [
			{
				"name": "arg0",
				"type": "uint256"
			}
		],
		"name": "balances",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"gas": 2750,
		"inputs": [],
		"name": "D",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"gas": 2780,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"gas": 2810,
		"inputs": [],
		"name": "future_owner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"gas": 2840,
		"inputs": [],
		"name": "xcp_profit",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"gas": 2870,
		"inputs": [],
		"name": "xcp_profit_a",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"gas": 2900,
		"inputs": [],
		"name": "virtual_price",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"gas": 2930,
		"inputs": [],
		"name": "is_killed",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"gas": 2960,
		"inputs": [],
		"name": "kill_deadline",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"gas": 2990,
		"inputs": [],
		"name": "transfer_ownership_deadline",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"gas": 3020,
		"inputs": [],
		"name": "admin_actions_deadline",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"gas": 3050,
		"inputs": [],
		"name": "admin_fee_receiver",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]