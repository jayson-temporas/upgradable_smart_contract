// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
 
contract Token {
    uint256 private totalSupply;
    string public version = 'V1';
 
    event TotalSupplyChanged(uint256 totalSupply);
 
    function updateTotalSupply(uint256 _totalSupply) public {
        totalSupply = _totalSupply;
        emit TotalSupplyChanged(_totalSupply);
    }
 
    function getTotalSupply() public view returns (uint256) {
        return totalSupply;
    }
}