pragma solidity ^0.5.0;

import "../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol";

/**
 *  @dev Contract to mint tokens for bunch of users with existing balance of coins.
 */
contract CoinsToBlockchain is Ownable {
  //  token to be used
  ERC20Mintable private _token;

  //  token amount to be claimed by users
  mapping(address => uint256) public claimBalance;


  //  NOT TESTED
  // /**
  //  * @dev Checks if balance of this contract is enough for total transfers.
  //  * @param _totalAmount Total amount of tokens to be transferred
  //  */
  // modifier balanceEnough(uint256 _totalAmount) {
  //   require(_totalAmount <= address(this).balance, "not enough balance");
  //   _;
  // }

  /**
   * @dev Constructor for contract.
   * IMPORTANT: this contract address must be allowed to mint token.
   * @param _tokenAddress Address of token to be used.
   */
  constructor(address _tokenAddress) public {
    require(_tokenAddress != address(0), "invalid token address");
    _token = ERC20Mintable(_tokenAddress);
  }

/**
 * @dev Sets amount of tokens for each user. User can claim those tokens afterwards.
 * @param _addresses Address list for tokens to be set to.
 * @param _amounts Token amounts to be set for each address.
 * @notice suggested limit is 40 elements in list.
 */
  function updateClaimBalances(address[] memory _addresses, uint256[] memory _amounts) public onlyOwner {
    for (uint256 i = 0; i < _addresses.length; i++) {
      require(address(_addresses[i]) != address(0), "address(0) cannt be used");
      claimBalance[address(_addresses[i])] = _amounts[i];
    }
  }

/**
 * @dev User claims tokens.
 */
  function claimTokens() public {
    require(claimBalance[msg.sender] > 0, "no balance to claim");
    
    uint256 pendingClaim = claimBalance[msg.sender];
    delete(claimBalance[msg.sender]);
    require(_token.mint(msg.sender, pendingClaim), "claim failed");
  }

  /**
    @notice HIGHLY NOT RECOMMENDED.
   */
  // /**
  //  * @dev Mints token amounts to provided addresses.
  //  * @param _addresses Address list to be sent tokens to.
  //  * @param _amounts Token amounts to be sent for each address.
  //  * @param _addresses Address list to be sent tokens to.
  //  * @notice suggested limit is 40 elements in list.
  //  */
  // function mint(address[] memory _addresses, uint256[] memory _amounts, uint256 _totalAmount) public balanceEnough(_totalAmount) {
  //   for (uint256 i = 0; i < _addresses.length; i++) {
  //     require(address(_addresses[i]) != address(0), "address(0) cannt be used");

  //     require(_token.mint(address(_addresses[i]), _amounts[i]), "mint failed");
  //   }
  // }
}
