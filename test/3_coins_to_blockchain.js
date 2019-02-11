import advanceToBlock from "./helpers/advanceToBlock.js";
import expectThrow from "./helpers/expectThrow.js";
import BigNumber from "bignumber.js";
import {
  AssertionError
} from "assert";

const TestCoinlinkToken = artifacts.require("../contracts/TestCoinlinkToken.sol");
const CoinsToBlockchain = artifacts.require("../contracts/CoinsToBlockchain.sol");

contract('CoinsToBlockchain', (accounts) => {
  const ADDR_0 = accounts[0];
  const ADDR_1 = accounts[1];
  const ADDR_2 = accounts[2];
  const ADDR_3 = accounts[3];
  const ADDR_4 = accounts[4];
  const ADDR_5 = accounts[5];
  const ADDR_6 = accounts[6];
  const ADDR_7 = accounts[7];

  let token;
  let coinsToBlockchain;

  beforeEach("deploy token and CoinsToBlockchain contracts", async () => {
    await advanceToBlock();

    //  TestCoinlinkToken
    const TOKEN_NAME = "Test Coinlinked Token";
    const TOKEN_SYMBOL = "TestCLT";
    const TOKEN_DECIMALS = 18;
    token = await TestCoinlinkToken.new(TOKEN_NAME, TOKEN_SYMBOL, TOKEN_DECIMALS);

    //  CoinsToBlockchain
    coinsToBlockchain = await CoinsToBlockchain.new(token.address);
    await token.addMinter(coinsToBlockchain.address);
  });

  describe("updateClaimBalances", async () => {
    it("should set correct balance to claim for respective addresses", async () => {
      let ADDR_1_TOKENS = 111;
      let ADDR_2_TOKENS = web3.utils.toWei("111.111", "ether");
      let ADDR_3_TOKENS = web3.utils.toWei("112.222", "ether");
      let ADDR_4_TOKENS = 222;

      let addresses = [ADDR_1, ADDR_2, ADDR_3, ADDR_4];
      let amounts = [ADDR_1_TOKENS, ADDR_2_TOKENS, ADDR_3_TOKENS, ADDR_4_TOKENS];
      await coinsToBlockchain.updateClaimBalances(addresses, amounts);

      assert.equal(new BigNumber(await coinsToBlockchain.claimBalance.call(ADDR_1)).toNumber(), ADDR_1_TOKENS, "wrong claim balance for ADDR_1");
      assert.equal(new BigNumber(await coinsToBlockchain.claimBalance.call(ADDR_2)).toNumber(), ADDR_2_TOKENS, "wrong claim balance for ADDR_2");
      assert.equal(new BigNumber(await coinsToBlockchain.claimBalance.call(ADDR_3)).toNumber(), ADDR_3_TOKENS, "wrong claim balance for ADDR_3");
      assert.equal(new BigNumber(await coinsToBlockchain.claimBalance.call(ADDR_4)).toNumber(), ADDR_4_TOKENS, "wrong claim balance for ADDR_4");
    });

    it("should set correct balance to claim for respective addresses", async () => {
      let ADDR_1_TOKENS_BEFORE = 111;
      let ADDR_4_TOKENS_AFTER = 222;

      await coinsToBlockchain.updateClaimBalances([ADDR_1], [ADDR_1_TOKENS_BEFORE]);
      assert.equal(new BigNumber(await coinsToBlockchain.claimBalance.call(ADDR_1)).toNumber(), ADDR_1_TOKENS_BEFORE, "wrong claim balance ADDR_1_TOKENS_BEFORE for ADDR_1");

      await coinsToBlockchain.updateClaimBalances([ADDR_1], [ADDR_4_TOKENS_AFTER]);
      assert.equal(new BigNumber(await coinsToBlockchain.claimBalance.call(ADDR_1)).toNumber(), ADDR_4_TOKENS_AFTER, "wrong claim balance ADDR_4_TOKENS_AFTER for ADDR_1");
    });
  });

  describe("claimTokens", async () => {
    it("should delete balances after claim", async () => {
      let ADDR_1_TOKENS = 222;
      let ADDR_2_TOKENS = web3.utils.toWei("111.111", "ether");

      let addresses = [ADDR_1, ADDR_2];
      let amounts = [ADDR_1_TOKENS, ADDR_2_TOKENS];
      await coinsToBlockchain.updateClaimBalances(addresses, amounts);

      await coinsToBlockchain.claimTokens({
        from: ADDR_1
      });

      await coinsToBlockchain.claimTokens({
        from: ADDR_2
      });

      assert.equal(new BigNumber(await coinsToBlockchain.claimBalance.call(ADDR_1)).toNumber(), 0, "claim balance for ADDR_1 should be 0 after claim");
      assert.equal(new BigNumber(await coinsToBlockchain.claimBalance.call(ADDR_2)).toNumber(), 0, "claim balance for ADDR_2 should be 0 after claim");
    });

    it("should update token balance after claim", async () => {
      let ADDR_1_TOKENS = 222;
      let ADDR_2_TOKENS = web3.utils.toWei("111.111", "ether");

      let addresses = [ADDR_1, ADDR_2];
      let amounts = [ADDR_1_TOKENS, ADDR_2_TOKENS];
      await coinsToBlockchain.updateClaimBalances(addresses, amounts);

      await coinsToBlockchain.claimTokens({
        from: ADDR_1
      });

      await coinsToBlockchain.claimTokens({
        from: ADDR_2
      });

      assert.equal(new BigNumber(await token.balanceOf.call(ADDR_1)).toNumber(), ADDR_1_TOKENS, "wrong balance for ADDR_1 after claim");
      assert.equal(new BigNumber(await token.balanceOf.call(ADDR_2)).toNumber(), ADDR_2_TOKENS, "wrong balance for ADDR_2 after claim");
    });
  });
});