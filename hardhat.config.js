require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
 
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/QO9VEoGt2J53QdbHsiJzZzmJLNdhqj_r`, 
      accounts: [`0x${process.env.METAMASK_PRIVATE_KEY}`] 
    }
  }
};
