// import BigNumber from "big-number";
// import contract from "truffle-contract";

// import testCoinlinkTokenArtifact from "../../build/contracts/TestCoinlinkToken.json";

// let TestCoinlinkToken = contract(testCoinlinkTokenArtifact);

const App = {
    currentAddress: null,
    currentBalance: null,

    start: async () => {


        var CoursetroContract = web3.eth.contract([{
                "constant": true,
                "inputs": [],
                "name": "name",
                "outputs": [{
                    "name": "",
                    "type": "string"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function",
                "signature": "0x06fdde03"
            },
            {
                "constant": false,
                "inputs": [{
                        "name": "spender",
                        "type": "address"
                    },
                    {
                        "name": "value",
                        "type": "uint256"
                    }
                ],
                "name": "approve",
                "outputs": [{
                    "name": "",
                    "type": "bool"
                }],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function",
                "signature": "0x095ea7b3"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "totalSupply",
                "outputs": [{
                    "name": "",
                    "type": "uint256"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function",
                "signature": "0x18160ddd"
            },
            {
                "constant": false,
                "inputs": [],
                "name": "unpauseMint",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function",
                "signature": "0x1a8bd2da"
            },
            {
                "constant": false,
                "inputs": [{
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "name": "value",
                        "type": "uint256"
                    }
                ],
                "name": "transferFrom",
                "outputs": [{
                    "name": "",
                    "type": "bool"
                }],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function",
                "signature": "0x23b872dd"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "decimals",
                "outputs": [{
                    "name": "",
                    "type": "uint8"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function",
                "signature": "0x313ce567"
            },
            {
                "constant": false,
                "inputs": [{
                        "name": "spender",
                        "type": "address"
                    },
                    {
                        "name": "addedValue",
                        "type": "uint256"
                    }
                ],
                "name": "increaseAllowance",
                "outputs": [{
                    "name": "",
                    "type": "bool"
                }],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function",
                "signature": "0x39509351"
            },
            {
                "constant": false,
                "inputs": [{
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "name": "value",
                        "type": "uint256"
                    }
                ],
                "name": "mint",
                "outputs": [{
                    "name": "",
                    "type": "bool"
                }],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function",
                "signature": "0x40c10f19"
            },
            {
                "constant": true,
                "inputs": [{
                    "name": "owner",
                    "type": "address"
                }],
                "name": "balanceOf",
                "outputs": [{
                    "name": "",
                    "type": "uint256"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function",
                "signature": "0x70a08231"
            },
            {
                "constant": false,
                "inputs": [],
                "name": "renounceOwnership",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function",
                "signature": "0x715018a6"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "mintPaused",
                "outputs": [{
                    "name": "",
                    "type": "bool"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function",
                "signature": "0x7e4831d3"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "owner",
                "outputs": [{
                    "name": "",
                    "type": "address"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function",
                "signature": "0x8da5cb5b"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "isOwner",
                "outputs": [{
                    "name": "",
                    "type": "bool"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function",
                "signature": "0x8f32d59b"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "symbol",
                "outputs": [{
                    "name": "",
                    "type": "string"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function",
                "signature": "0x95d89b41"
            },
            {
                "constant": false,
                "inputs": [{
                    "name": "account",
                    "type": "address"
                }],
                "name": "addMinter",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function",
                "signature": "0x983b2d56"
            },
            {
                "constant": false,
                "inputs": [],
                "name": "renounceMinter",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function",
                "signature": "0x98650275"
            },
            {
                "constant": false,
                "inputs": [{
                        "name": "spender",
                        "type": "address"
                    },
                    {
                        "name": "subtractedValue",
                        "type": "uint256"
                    }
                ],
                "name": "decreaseAllowance",
                "outputs": [{
                    "name": "",
                    "type": "bool"
                }],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function",
                "signature": "0xa457c2d7"
            },
            {
                "constant": false,
                "inputs": [{
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "name": "value",
                        "type": "uint256"
                    }
                ],
                "name": "transfer",
                "outputs": [{
                    "name": "",
                    "type": "bool"
                }],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function",
                "signature": "0xa9059cbb"
            },
            {
                "constant": true,
                "inputs": [{
                    "name": "account",
                    "type": "address"
                }],
                "name": "isMinter",
                "outputs": [{
                    "name": "",
                    "type": "bool"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function",
                "signature": "0xaa271e1a"
            },
            {
                "constant": false,
                "inputs": [],
                "name": "pauseMint",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function",
                "signature": "0xcd85cdb5"
            },
            {
                "constant": true,
                "inputs": [{
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "name": "spender",
                        "type": "address"
                    }
                ],
                "name": "allowance",
                "outputs": [{
                    "name": "",
                    "type": "uint256"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function",
                "signature": "0xdd62ed3e"
            },
            {
                "constant": false,
                "inputs": [{
                    "name": "newOwner",
                    "type": "address"
                }],
                "name": "transferOwnership",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function",
                "signature": "0xf2fde38b"
            },
            {
                "inputs": [{
                        "name": "_name",
                        "type": "string"
                    },
                    {
                        "name": "_symbol",
                        "type": "string"
                    },
                    {
                        "name": "_decimals",
                        "type": "uint8"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "constructor",
                "signature": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [{
                    "indexed": true,
                    "name": "account",
                    "type": "address"
                }],
                "name": "MinterAdded",
                "type": "event",
                "signature": "0x6ae172837ea30b801fbfcdd4108aa1d5bf8ff775444fd70256b44e6bf3dfc3f6"
            },
            {
                "anonymous": false,
                "inputs": [{
                    "indexed": true,
                    "name": "account",
                    "type": "address"
                }],
                "name": "MinterRemoved",
                "type": "event",
                "signature": "0xe94479a9f7e1952cc78f2d6baab678adc1b772d936c6583def489e524cb66692"
            },
            {
                "anonymous": false,
                "inputs": [{
                        "indexed": true,
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "name": "value",
                        "type": "uint256"
                    }
                ],
                "name": "Transfer",
                "type": "event",
                "signature": "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
            },
            {
                "anonymous": false,
                "inputs": [{
                        "indexed": true,
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "name": "spender",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "name": "value",
                        "type": "uint256"
                    }
                ],
                "name": "Approval",
                "type": "event",
                "signature": "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925"
            },
            {
                "anonymous": false,
                "inputs": [{
                        "indexed": true,
                        "name": "previousOwner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "name": "newOwner",
                        "type": "address"
                    }
                ],
                "name": "OwnershipTransferred",
                "type": "event",
                "signature": "0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0"
            }
        ]);
        var Coursetro = CoursetroContract.at("0x0E1f6e688c81066c2A5572e774e251836a6F9c4B");
        console.log(Coursetro);

        Coursetro.name.call((err, res) => {
            if (err) {
                console.log("err: ", err);
            } else {
                console.log("res: ", res);
            }
        });

























        // TestCoinlinkToken.setProvider(web3.currentProvider);

        App.updateAccountInfo();
        // console.log(TestCoinlinkToken);
        // App.updateTokenOwner();

        // App.listenEventTransfer();
    },

    //  OWNER
    updateTokenOwner: async () => {
        console.log("updateTokenOwner");

        // TestCoinlinkToken.owner((err, res) => {
        //     if (err) {
        //         console.log("err: ", err);
        //     } else {
        //         console.log("res: ", res);

        //         document.getElementById("Owner_owner_address").innerText = res;
        //     }
        // });
    },

    updateAccountInfo: async () => {
        App.currentAddress = await App.getCurrentAddress();
        App.currentBalance = await App.getCurrentBalance();

        document.getElementById("address").innerText = App.currentAddress;
        document.getElementById("balance").innerText = App.currentBalance;
    },

    getCurrentAddress: async () => {
        return new Promise(resolve => {
            web3.eth.getAccounts(function (error, result) {
                resolve(result[0]);
            });
        });
    },

    getCurrentBalance: async () => {
        return new Promise(resolve => {
            web3.eth.getBalance(App.currentAddress, function (error, result) {
                resolve(web3.fromWei(result.toNumber(), 'ether'));
            });
        });
    },

    //  TRANSFER
    transferFunds: () => {
        document.getElementById("Transfer_loader").setAttribute("style", "visibility: visible");

        let to_address = document.getElementById("Transfer_toAddress").value;
        let to_amount = document.getElementById("Transfer_amount").value;
        if (to_address.length == 0 || to_amount.length == 0) {
            document.getElementById("Transfer_loader").setAttribute("style", "visibility: hidden");
            return;
        }

        let to_amount_with_decimals = web3.toWei(to_amount, 'ether');

        TestCoinlinkToken.transfer(to_address, to_amount_with_decimals, {
            from: APP.currentAddress,
            amount: to_amount_with_decimals
        });
    },

    transferFundsFinished: async () => {
        console.log("transferFundsFinished");
    },

    listenEventTransfer: async () => {
        console.log("listenEventTransfer");

        var CoursetroContract = web3.eth.contract([{
                "constant": true,
                "inputs": [],
                "name": "name",
                "outputs": [{
                    "name": "",
                    "type": "string"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function",
                "signature": "0x06fdde03"
            },
            {
                "constant": false,
                "inputs": [{
                        "name": "spender",
                        "type": "address"
                    },
                    {
                        "name": "value",
                        "type": "uint256"
                    }
                ],
                "name": "approve",
                "outputs": [{
                    "name": "",
                    "type": "bool"
                }],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function",
                "signature": "0x095ea7b3"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "totalSupply",
                "outputs": [{
                    "name": "",
                    "type": "uint256"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function",
                "signature": "0x18160ddd"
            },
            {
                "constant": false,
                "inputs": [],
                "name": "unpauseMint",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function",
                "signature": "0x1a8bd2da"
            },
            {
                "constant": false,
                "inputs": [{
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "name": "value",
                        "type": "uint256"
                    }
                ],
                "name": "transferFrom",
                "outputs": [{
                    "name": "",
                    "type": "bool"
                }],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function",
                "signature": "0x23b872dd"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "decimals",
                "outputs": [{
                    "name": "",
                    "type": "uint8"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function",
                "signature": "0x313ce567"
            },
            {
                "constant": false,
                "inputs": [{
                        "name": "spender",
                        "type": "address"
                    },
                    {
                        "name": "addedValue",
                        "type": "uint256"
                    }
                ],
                "name": "increaseAllowance",
                "outputs": [{
                    "name": "",
                    "type": "bool"
                }],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function",
                "signature": "0x39509351"
            },
            {
                "constant": false,
                "inputs": [{
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "name": "value",
                        "type": "uint256"
                    }
                ],
                "name": "mint",
                "outputs": [{
                    "name": "",
                    "type": "bool"
                }],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function",
                "signature": "0x40c10f19"
            },
            {
                "constant": true,
                "inputs": [{
                    "name": "owner",
                    "type": "address"
                }],
                "name": "balanceOf",
                "outputs": [{
                    "name": "",
                    "type": "uint256"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function",
                "signature": "0x70a08231"
            },
            {
                "constant": false,
                "inputs": [],
                "name": "renounceOwnership",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function",
                "signature": "0x715018a6"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "mintPaused",
                "outputs": [{
                    "name": "",
                    "type": "bool"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function",
                "signature": "0x7e4831d3"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "owner",
                "outputs": [{
                    "name": "",
                    "type": "address"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function",
                "signature": "0x8da5cb5b"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "isOwner",
                "outputs": [{
                    "name": "",
                    "type": "bool"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function",
                "signature": "0x8f32d59b"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "symbol",
                "outputs": [{
                    "name": "",
                    "type": "string"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function",
                "signature": "0x95d89b41"
            },
            {
                "constant": false,
                "inputs": [{
                    "name": "account",
                    "type": "address"
                }],
                "name": "addMinter",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function",
                "signature": "0x983b2d56"
            },
            {
                "constant": false,
                "inputs": [],
                "name": "renounceMinter",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function",
                "signature": "0x98650275"
            },
            {
                "constant": false,
                "inputs": [{
                        "name": "spender",
                        "type": "address"
                    },
                    {
                        "name": "subtractedValue",
                        "type": "uint256"
                    }
                ],
                "name": "decreaseAllowance",
                "outputs": [{
                    "name": "",
                    "type": "bool"
                }],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function",
                "signature": "0xa457c2d7"
            },
            {
                "constant": false,
                "inputs": [{
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "name": "value",
                        "type": "uint256"
                    }
                ],
                "name": "transfer",
                "outputs": [{
                    "name": "",
                    "type": "bool"
                }],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function",
                "signature": "0xa9059cbb"
            },
            {
                "constant": true,
                "inputs": [{
                    "name": "account",
                    "type": "address"
                }],
                "name": "isMinter",
                "outputs": [{
                    "name": "",
                    "type": "bool"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function",
                "signature": "0xaa271e1a"
            },
            {
                "constant": false,
                "inputs": [],
                "name": "pauseMint",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function",
                "signature": "0xcd85cdb5"
            },
            {
                "constant": true,
                "inputs": [{
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "name": "spender",
                        "type": "address"
                    }
                ],
                "name": "allowance",
                "outputs": [{
                    "name": "",
                    "type": "uint256"
                }],
                "payable": false,
                "stateMutability": "view",
                "type": "function",
                "signature": "0xdd62ed3e"
            },
            {
                "constant": false,
                "inputs": [{
                    "name": "newOwner",
                    "type": "address"
                }],
                "name": "transferOwnership",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function",
                "signature": "0xf2fde38b"
            },
            {
                "inputs": [{
                        "name": "_name",
                        "type": "string"
                    },
                    {
                        "name": "_symbol",
                        "type": "string"
                    },
                    {
                        "name": "_decimals",
                        "type": "uint8"
                    }
                ],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "constructor",
                "signature": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [{
                    "indexed": true,
                    "name": "account",
                    "type": "address"
                }],
                "name": "MinterAdded",
                "type": "event",
                "signature": "0x6ae172837ea30b801fbfcdd4108aa1d5bf8ff775444fd70256b44e6bf3dfc3f6"
            },
            {
                "anonymous": false,
                "inputs": [{
                    "indexed": true,
                    "name": "account",
                    "type": "address"
                }],
                "name": "MinterRemoved",
                "type": "event",
                "signature": "0xe94479a9f7e1952cc78f2d6baab678adc1b772d936c6583def489e524cb66692"
            },
            {
                "anonymous": false,
                "inputs": [{
                        "indexed": true,
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "name": "value",
                        "type": "uint256"
                    }
                ],
                "name": "Transfer",
                "type": "event",
                "signature": "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
            },
            {
                "anonymous": false,
                "inputs": [{
                        "indexed": true,
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "name": "spender",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "name": "value",
                        "type": "uint256"
                    }
                ],
                "name": "Approval",
                "type": "event",
                "signature": "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925"
            },
            {
                "anonymous": false,
                "inputs": [{
                        "indexed": true,
                        "name": "previousOwner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "name": "newOwner",
                        "type": "address"
                    }
                ],
                "name": "OwnershipTransferred",
                "type": "event",
                "signature": "0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0"
            }
        ]);
        var Coursetro = CoursetroContract.at("0x0E1f6e688c81066c2A5572e774e251836a6F9c4B");
        console.log(Coursetro);

        // var instructorEvent = Coursetro.Transfer();
        // instructorEvent.watch(function (error, result) {
        //     if (!error) {
        //         console.log("error: ", error);
        //     } else {
        //         console.log(result);
        //     }
        // });

    }
}

window.App = App;

window.addEventListener('load', async () => {
    // Modern dapp browsers...
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            // Request account access if needed
            await ethereum.enable();

            App.start();
        } catch (error) {
            console.error("ethereum.enable() ERROR: ", error);
            alert(error);
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
    }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
});

window.addEventListener("focus", function () {
    App.updateAccountInfo();

});