pragma solidity ^0.5.0;

import "../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol";

/**
  * @title Contarct with minting process enabled at the beginning. Minting can be disabled permanently by owner
 */
contract FinalizableMinting is Ownable, ERC20Mintable {
  bool private _mintFinalized;

/**
  * @dev Checks if minting is allowed
 */
  modifier whileMintAllowed() {
    require(!_mintFinalized, "mint is finalized");
    _;
  }

  constructor() public {
  }

/**
  * @dev Disables minting permanently. 
  * Can be called ny owner only
 */
  function finalizeMint() external onlyOwner whileMintAllowed {
    _mintFinalized = true;
  }

/**
  * @dev Checks if minting is finalized.
  * @return A boolean that indicates if minting is allowed.
 */
  function mintFinalized() view public returns(bool) {
    return _mintFinalized;
  }

  /**
    * @dev Function to mint tokens
    * @param to The address that will receive the minted tokens.
    * @param value The amount of tokens to mint.
    * @return A boolean that indicates if the operation was successful.
    */
  function mint(address to, uint256 value) public onlyMinter whileMintAllowed returns (bool) {
      _mint(to, value);
      return true;
  }
}
