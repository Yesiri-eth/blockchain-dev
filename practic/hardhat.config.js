require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
   solidity: "0.8.24",
   networks:{
     "arbitrum-sepolia": {
      url:"https://sepolia-rollup.arbitrum.io/rpc",
      chainId: 421614,
      accounts: [""]
       
     } 


  },
};
