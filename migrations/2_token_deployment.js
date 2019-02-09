const TestCoinlinkToken = artifacts.require("./TestCoinlinkToken.sol");

module.exports = function (deployer) {
    let tokenName = "Token_Name";
    let tokenSymbol = "TTT";
    let tokenDecimals = 18;

    deployer.deploy(TestCoinlinkToken, tokenName, tokenSymbol, tokenDecimals);
};