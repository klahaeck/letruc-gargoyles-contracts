#!/usr/bin/env node

require('dotenv').config();
const args = require('yargs')
  .option('data', {
    number: false,
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
  const { data } = args;
  if (!process.env.HARDHAT_NETWORK || !data) {
    throw('Please provide a network and data argument');
  };

  const airdropTo = require(data);

  for (let i = 0; i < airdropTo.length; i++) {
    const { address, tokenUri } = airdropTo[i];
    console.log(`Minting NFT to: ${address} with URI ${tokenUri} on the ${process.env.HARDHAT_NETWORK} network`);
    await nft.safeMint(address, tokenUri);
  }

  console.log('It will take few minutes for the transactions to be confirmed');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
