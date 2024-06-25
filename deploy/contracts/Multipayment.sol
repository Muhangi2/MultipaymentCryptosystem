// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Multipayment {
    function send(
        address payable[] calldata recipients,
        uint[] calldata amounts
    ) external payable {
        require(
            recipients.length == amounts.length,
            "Receipients and amounts must have the same length"
        );
        for (uint i = 0; i < recipients.length; i++) {
            recipients[i].call{value: amounts[i]}("");
        }
    }
}
