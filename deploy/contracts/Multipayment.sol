// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract Multipayment {
    function send(
        address payable[] calldata recipients,
        uint[] calldata amounts
    ) external payable {
        require(
            recipients.length == amounts.length,
            "Recipients and amounts must have the same length"
        );
        for (uint i = 0; i < recipients.length; i++) {
            (bool success, ) = recipients[i].call{value: amounts[i]}("");
            require(success, "Transfer failed.");
        }
    }
}
