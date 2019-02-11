pragma solidity ^0.5.0;

import "../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol";

/**
  * @title Contarct with minting process enabled at the beginning. Minting can be disabled permanently by owner
 */
contract PausableMinting is Ownable, ERC20Mintable {
  bool private _mintPaused;

/**
  * @dev Checks if minting is not paused
 */
  modifier whileMintNotPaused() {
    require(!_mintPaused, "mint is paused");
    _;
  }

  constructor() public {
  }

/**
  * @dev Pauses minting. 
  * Can be called ny owner only
 */
  function pauseMint() external onlyOwner whileMintNotPaused {
    _mintPaused = true;
  }

  /**
   * @dev Pauses minting. 
   * Can be called ny owner only
  */
  function unpauseMint() external onlyOwner {
    require(_mintPaused);
    _mintPaused = false;
  }

/**
  * @dev Checks if minting is paused.
  * @return A boolean that indicates if minting is allowed.
 */
  function mintPaused() view public returns(bool) {
    return _mintPaused;
  }

  /**
    * @dev Function to mint tokens
    * @param to The address that will receive the minted tokens.
    * @param value The amount of tokens to mint.
    * @return A boolean that indicates if the operation was successful.
    */
  function mint(address to, uint256 value) public onlyMinter whileMintNotPaused returns (bool) {
      _mint(to, value);
      return true;
  }
}
