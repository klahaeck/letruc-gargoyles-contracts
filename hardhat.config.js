require('dotenv').config();
require('@openzeppelin/hardhat-upgrades');
require("@nomicfoundation/hardhat-toolbox");

task('mint', 'Mints an NFT to an address', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: '0.8.4',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    // defaultNetwork: 'hardhat',
    localhost: {
      forking: {
        url: process.env.INFURA_RPC_URL_MAINNET
      },
    },
    goerli: {
      chainId: 5,
      url: process.env.INFURA_RPC_URL_GOERLI,
      accounts: [process.env.CREATOR_PRIVATE_KEY],
    },
    mainnet: {
      chainId: 1,
      url: process.env.INFURA_RPC_URL_MAINNET,
      accounts: [process.env.CREATOR_PRIVATE_KEY],
    },
  },
};
