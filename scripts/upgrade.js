require('dotenv').config();
const { network, ethers, upgrades } = require('hardhat');

console.log(network);

async function main() {
  const contractAddress = network.name === 'mainnet' ? process.env.CONTRACT_ADDRESS_MAINNET : process.env.CONTRACT_ADDRESS_GOERLI;
  const [deployer] = await ethers.getSigners();
  console.log('Deploying contracts with the account:', deployer.address);
  console.log('Account balance:', (await deployer.getBalance()).toString());

  const GargoylesUpgrade = await ethers.getContractFactory('Gargoyles');
  await upgrades.upgradeProxy(contractAddress, GargoylesUpgrade);
  console.log(`Gargoyles successfully upgraded to ${network.name}!`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
