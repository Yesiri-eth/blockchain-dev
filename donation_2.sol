// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
 // a donation contract can 
//set a particular goal
// allow a deposit
//check balance
//withdraw

contract donation{
uint256 public balance;
uint256 immutable goal;
constructor(uint goal_){
    goal=goal_;
}
function deposit() public payable {
balance += msg.value;
} 
function withdrawal(uint256 amount, address user) public payable {
    balance -= amount;
     payable(user).transfer(amount);
}

}
