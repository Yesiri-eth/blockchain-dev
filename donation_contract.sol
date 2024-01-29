// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
 // a donation contract can 
// allow a particular deposit
//check balance

contract donation  {
address public owner;
uint256 public balance; 

function deposit(uint256 amount) public payable  {
 balance +=amount;




}

   

}
