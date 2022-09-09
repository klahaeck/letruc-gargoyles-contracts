// require('dotenv').config();
const { ethers, upgrades } = require('hardhat');

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log('Deploying contracts with the account:', deployer.address);
  console.log('Account balance:', (await deployer.getBalance()).toString());

  const Gargoyles = await ethers.getContractFactory('Gargoyles');
  const gargoyles = await upgrades.deployProxy(Gargoyles, [], { initializer: 'initialize' });
  await gargoyles.deployed();
  console.log('Gargoyles deployed to:', gargoyles.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
