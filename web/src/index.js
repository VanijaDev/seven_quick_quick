import {
    Token
} from "./blockchain_models/token";

const App = {
    currentAddress: null,
    currentBalance: null,
    tokenContract: null,
    tokenOwnerAddr: null,

    start: async () => {
        App.createContract();
        App.updateOwnerInfo();
        App.setupEventListeners();
        App.updateCurrentAddressInfo();
    },

    createContract: () => {
        App.tokenContract = web3.eth.contract(Token.abi).at(Token.address);
        // console.log(App.tokenContract);
    },

    setupEventListeners: () => {
        console.log("setup");
        // event Transfer(address indexed from, address indexed to, uint256 value);
        App.tokenContract.Transfer({
            from: App.tokenOwnerAddr
        }, (err, res) => {
            if (err) {
                console.error(err);
            } else {
                console.log("Transfer event caught");
                App.updateOwnerInfo();
                App.updateCurrentAddressInfo();
            }
        });
    },

    //  OWNER

    getTokenOwner: async () => {
        return new Promise(resolve => {
            App.tokenContract.owner((err, res) => {
                if (err) {
                    console.error(err);
                } else {
                    resolve(res);
                }
            });
        });
    },

    getTokenBalance: async (addr) => {
        return new Promise(resolve => {
            App.tokenContract.balanceOf(addr, (err, res) => {
                if (err) {
                    console.error(err);
                } else {
                    resolve(web3.fromWei(res, "wei"));
                }
            });
        });
    },

    updateOwnerInfo: async () => {
        App.tokenOwnerAddr = await App.getTokenOwner();
        console.log(App.tokenOwnerAddr);
        document.getElementById("Owner_owner_address").innerText = App.tokenOwnerAddr;
        document.getElementById("Owner_owner_balance").innerText = await App.getTokenBalance(App.tokenOwnerAddr);
    },

    mintToOwner: async () => {
        return new Promise(resolve => {
            App.tokenContract.mint(App.tokenOwnerAddr, web3.toWei(1, "ether"), {
                from: App.tokenOwnerAddr
            }, (err, res) => {
                if (err) {
                    console.error("mintToOwner: ", err);
                } else {
                    resolve(res);
                }
            });
        });
    },

    //  USER
    updateCurrentAddressInfo: async () => {
        App.currentAddress = await App.getCurrentAddress();
        App.currentBalance = await App.getCurrentAddressBalance_eth();

        document.getElementById("currentAddress").innerText = App.currentAddress;
        document.getElementById("currentAddressBalance").innerText = App.currentBalance;
        document.getElementById("tokenBalance").innerText = await App.getCurrentAddressBalance_token();

        //  update text color if addresses are the same
        let colorAttr = (App.tokenOwnerAddr == App.currentAddress) ? "font-weight: bold; color: red" : "font-weight: bold; color: black";
        document.getElementById("currentAddress").setAttribute("style", colorAttr);
        document.getElementById("Owner_owner_address").setAttribute("style", colorAttr);
    },

    getCurrentAddress: async () => {
        return new Promise(resolve => {
            web3.eth.getAccounts(function (err, res) {
                if (err) {
                    console.error("getCurrentAddress: ", err);
                } else {
                    resolve(res[0]);
                }
            });
        });
    },

    getCurrentAddressBalance_eth: async () => {
        return new Promise(resolve => {
            web3.eth.getBalance(App.currentAddress, function (err, res) {
                if (err) {
                    console.error("getCurrentAddressBalance_eth: ", err);
                } else {
                    resolve(web3.fromWei(res.toNumber(), 'ether'));
                }
            });
        });
    },

    getCurrentAddressBalance_token: async () => {
        return new Promise(resolve => {
            App.tokenContract.balanceOf(App.currentAddress, (err, res) => {
                if (err) {
                    console.error("getCurrentAddressBalance_token: ", err);
                } else {
                    resolve(res);
                }
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
            console.error("if (to_address.length == 0 || to_amount.length == 0)");
            return;
        }

        App.tokenContract.transfer(to_address, to_amount, (err, res) => {
            if (err) {
                console.error("transferFunds: ", err);
            } else {
                document.getElementById("Transfer_loader").setAttribute("style", "visibility: hidden");
            }
        });
    },
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
    App.updateCurrentAddressInfo();
});