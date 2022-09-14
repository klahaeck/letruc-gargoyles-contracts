#!/usr/bin/env node

require('dotenv').config();
const args = require('yargs')
  .option('mintTo', {
    number: false,
    string: true
  })
  .option('tokenURI', {
    string: true
  })
  .argv;
const { ethers } = require('hardhat');
const contract = require("../artifacts/contracts/Gargoyles.sol/Gargoyles.json");
const contractInterface = contract.abi;

const provider = ethers.provider;

const privateKey = process.env.CREATOR_PRIVATE_KEY;
const wallet = new ethers.Wallet(privateKey);
wallet.provider = provider;
const signer = wallet.connect(provider);

const contractAddress = process.env.HARDHAT_NETWORK === 'mainnet' ? process.env.CONTRACT_ADDRESS_MAINNET : process.env.CONTRACT_ADDRESS_GOERLI;

const nft = new ethers.Contract(
  contractAddress,
  contractInterface,
  signer
);

async function main() {
  const { mintTo, tokenUri } = args;
  if (!process.env.HARDHAT_NETWORK || !mintTo || !tokenUri) {
    throw('Please provide a network, mintTo address, and tokenURI');
  };
  console.log(`Minting NFT to: ${mintTo} with URI ${tokenUri} on the ${process.env.HARDHAT_NETWORK} network`);
  console.log('Waiting 3 blocks for confirmation...');
  nft
    .safeMint(mintTo, tokenUri)
    .then((tx) => tx.wait(3))
    .then((receipt) => console.log(`Your transaction is confirmed, its receipt is: ${receipt.transactionHash}`))
    .catch((e) => console.log("something went wrong", e));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
