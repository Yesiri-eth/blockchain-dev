// SPDX-License-Identifier: MIT
pragma solidity  0.8.19 ;


contract thrift {
// a thrift contract can allow deposit 
//stop deposit when goal has been reached
// allow withdrawal only to a particular person only when  the goal  has been reachead
//check balance 
 uint256 immutable public goal;
 uint256 public balance;
 constructor(uint256 goal_)
 { goal=goal_;}
function deposit() payable public  {
 require(balance<goal,"goal has been reached wait for next round!!!" ) ;
 balance += msg.value;
}
function withdrawal(uint256 amount, address user) payable public {
require(balance>=goal,"goal has not been reached!!!" ) ;
balance-= amount;
payable(user).transfer(amount);
  
}
}
