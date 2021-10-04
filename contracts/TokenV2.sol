// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
 
contract TokenV2 {
    uint256 private totalSupply;
    string public version = 'V2';
 
    event TotalSupplyChanged(uint256 totalSupply);
 
    function updateTotalSupply(uint256 _totalSupply) public {
        totalSupply = _totalSupply;
        emit TotalSupplyChanged(_totalSupply);
    }
 
    function getTotalSupply() public view returns (uint256) {
        return totalSupply;
    }

    function mintToken() public {
        totalSupply = totalSupply + 1000;
    }
}