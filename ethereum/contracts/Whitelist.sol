pragma solidity ^0.4.24;
import "./ownership/Ownable.sol";

/**
 * @title Smart contract that hold info about whitelisted accounts.
 */
contract Whitelist is Ownable {

  /**
   * @dev Mapping addresses and their states.
   */
  mapping (address => bool) private whitelisted;

  /**
   * @dev Sets whitelist state for a specific address.
   * @param _target Address for which we are settin the state.
   * @param _state Whitelist state of the _target.
   */
  function setWhitelisted(address _target, bool _state) external onlyOwner
  {
    whitelisted[_target] = _state;
  }
 
  /**
   * @dev Sets whitelist state to true for all the targets.
   * @param _targets Array of addresses which we want to whitelist.
   */
  function batchWhitelist(address[] _targets) external onlyOwner
  {
    for(uint256 i; i<_targets.length; i++)
    {
      whitelisted[_targets[i]] = true;
    }
  }

  /**
   * @dev Checks if specific address is whitelisted.
   * @param _target Address for which we want to check the state.
   */
  function isWhitelisted(address _target) external view returns (bool)
  {
    return whitelisted[_target];
  } 
}