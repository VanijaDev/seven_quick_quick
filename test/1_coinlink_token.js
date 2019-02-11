import advanceToBlock from "./helpers/advanceToBlock.js";
import expectThrow from "./helpers/expectThrow.js";
import BigNumber from "bignumber.js";

const TestCoinlinkToken = artifacts.require("../contracts/TestCoinlinkToken.sol");

contract("CoinlinkToken", (accounts) => {
  const TOKEN_NAME = "Test Coinlinked Token";
  const TOKEN_SYMBOL = "TestCLT";
  const TOKEN_DECIMALS = 18;

  const ADDR_0 = accounts[0];
  const ADDR_1 = accounts[1];
  const ADDR_2 = accounts[2];

  let token;

  beforeEach("deploy token", async () => {
    await advanceToBlock();

    token = await TestCoinlinkToken.new(TOKEN_NAME, TOKEN_SYMBOL, TOKEN_DECIMALS);
  });

  describe("token details", () => {
    it("should validate token name", async () => {
      assert.equal(await token.name.call(), TOKEN_NAME, "wrong token name");
    });

    it("should validate token symbol", async () => {
      assert.equal(await token.symbol.call(), TOKEN_SYMBOL, "wrong token symbol");
    });

    it("should validate token decimals", async () => {
      assert.equal(new BigNumber(await token.decimals.call()).toNumber(), TOKEN_DECIMALS, "wrong token decimals");
    });
  });

  describe("mint functional", () => {
    it("should validate minted amount", async () => {
      const TOKEN_AMOUNT_ADDR_1 = 111;

      assert.equal(new BigNumber(await token.balanceOf.call(ADDR_1)).toNumber(), 0, "wrong token balance before transfer");
      await token.mint(ADDR_1, TOKEN_AMOUNT_ADDR_1);
      assert.equal(new BigNumber(await token.balanceOf.call(ADDR_1)).toNumber(), TOKEN_AMOUNT_ADDR_1, "wrong token balance after transfer");
    });

    it("should allow minting for new minter", async () => {
      const TOKEN_AMOUNT_ADDR_1 = 112;

      await token.addMinter(ADDR_2);

      assert.equal(new BigNumber(await token.balanceOf.call(ADDR_1)).toNumber(), 0, "wrong token balance before transfer");
      await token.mint(ADDR_1, TOKEN_AMOUNT_ADDR_1, {
        from: ADDR_2
      });
      assert.equal(new BigNumber(await token.balanceOf.call(ADDR_1)).toNumber(), TOKEN_AMOUNT_ADDR_1, "wrong token balance after transfer");
    });
  });
});