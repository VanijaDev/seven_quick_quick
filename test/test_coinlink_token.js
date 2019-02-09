import advanceToBlock from "./helpers/advanceToBlock.js";
import expectThrow from "./helpers/expectThrow.js";
import BigNumber from "bignumber.js";

const TestCoinlinkToken = artifacts.require("../contracts/TestCoinlinkToken.sol");

contract("TestCoinlinkToken", (accounts) => {
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

    it("should finalize minting by owner", async () => {
      assert.isFalse(await token.mintFinalized.call(), "mint should be allowed");
      await token.finalizeMint();
      assert.isTrue(await token.mintFinalized.call(), "mint should be finalized");
    });

    it("should not mint when minting is finalized", async () => {
      const TOKEN_AMOUNT_ADDR_1 = 113;

      //  minting is allowed
      await token.mint(ADDR_1, TOKEN_AMOUNT_ADDR_1);
      await token.finalizeMint();
      await expectThrow(token.mint(ADDR_1, TOKEN_AMOUNT_ADDR_1), "should throw, when minting is finalized");
    });

    it("should allow finalize minting by owner", async () => {
      await token.finalizeMint.call();
    });

    it("should not allow finalize minting by other address, but owner", async () => {
      await expectThrow(token.finalizeMint({
        from: ADDR_1
      }), "should throw is not owner tries to finalize minting");
    });
  });
});