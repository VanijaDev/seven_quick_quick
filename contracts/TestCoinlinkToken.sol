pragma solidity ^0.5.0;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "./FinalizableMinting.sol";


contract TestCoinlinkToken is ERC20Detailed, FinalizableMinting {

  /**
    @dev Validates provided token details.
    @param _name Toekn name provided.
    @param _symbol Toekn symbol provided.
   */
  modifier validatedTokenDetails(string memory _name, string memory _symbol) {
    require(bytes(_name).length > 0, "invalid details");
    require(bytes(_symbol).length > 0, "invalid details");
    _;
  } 

  /**
    @dev Constructor for contract.
    @param _name Token name.
    @param _symbol Token symbol (ticker).
    @param _decimals Token decimals.
   */
  constructor(string memory _name, string memory _symbol, uint8 _decimals) 
    ERC20Detailed(_name, _symbol, _decimals) validatedTokenDetails(_name, _symbol) public {
  }
}
