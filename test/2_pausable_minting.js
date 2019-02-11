import advanceToBlock from "./helpers/advanceToBlock.js";
import expectThrow from "./helpers/expectThrow.js";
import BigNumber from "bignumber.js";

const TestCoinlinkToken = artifacts.require("../contracts/TestCoinlinkToken.sol");

contract('PausableMinting', (accounts) => {
  const ADDR_0 = accounts[0];
  const ADDR_1 = accounts[1];
  const ADDR_2 = accounts[2];

  let token;

  beforeEach("deploy token", async () => {
    await advanceToBlock();

    const TOKEN_NAME = "Test Coinlinked Token";
    const TOKEN_SYMBOL = "TestCLT";
    const TOKEN_DECIMALS = 18;
    token = await TestCoinlinkToken.new(TOKEN_NAME, TOKEN_SYMBOL, TOKEN_DECIMALS);
  });

  describe("Pause functional", async () => {
    it("should pause by owner only", async () => {
      await token.pauseMint();
    });

    it("should throw if not owner tries to pause", async () => {
      await expectThrow(token.pauseMint({
        from: ADDR_1
      }), "should throw if not owner tries to pause");
    });

    it("should validate mint paused bool value", async () => {
      assert.isFalse(await token.mintPaused.call(), "should not be paused yet");
      await token.pauseMint();
      assert.isTrue(await token.mintPaused.call(), "should be paused");
    });
  });

  describe("Unpause functional", async () => {
    it("should unpause by owner only", async () => {
      // pause before
      await token.pauseMint();

      await token.unpauseMint();
    });

    it("should throw if not owner tries to unpause", async () => {
      // pause before
      await token.pauseMint();

      await expectThrow(token.unpauseMint({
        from: ADDR_1
      }), "should throw if not owner tries to unpauseMint");
    });
  });

  describe("Minting functional", async () => {
    it("should not mint when minting is paused", async () => {
      const TOKEN_AMOUNT_ADDR_1 = 113;

      //  minting is allowed
      await token.mint(ADDR_1, TOKEN_AMOUNT_ADDR_1);
      await token.pauseMint();
      await expectThrow(token.mint(ADDR_1, TOKEN_AMOUNT_ADDR_1), "should throw, when minting is paused");
    });

    it("should restart mint after minting was paused", async () => {
      const TOKEN_AMOUNT_ADDR_1 = 113;

      await token.pauseMint();
      await expectThrow(token.mint(ADDR_1, TOKEN_AMOUNT_ADDR_1), "should throw, when minting is paused");
      await token.unpauseMint();
      await token.mint(ADDR_1, TOKEN_AMOUNT_ADDR_1);
    });
  });
});