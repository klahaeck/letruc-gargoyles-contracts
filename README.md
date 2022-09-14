# Gargoyles Hardhat Project

you must set your own env variables by copying and setting the variables from .env-sample to .env

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
GAS_REPORT=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```

To Deploy
```shell
npx hardhat run scripts/deploy.js --network goerli
```

To Deploy
first you must set the contract address on the appropriate network in the .env file 
```shell
npx hardhat run scripts/upgrade.js --network goerli
```

To Mint an NFT
first you must set your ETH address and the contract address on the appropriate network in the .env file 
```shell
HARDHAT_NETWORK=goerli node scripts/mint.js --mintTo MINTO_ADDRESS_HERE --tokenUri TOKEN_URI_HERE
```

To Airdrop NFTs
first you must set your ETH address and the contract address on the appropriate network in the .env file
you then must set the addresses and tokenUris in the airdrop_data.json file
The path to the airdrop_data.json file is set as the --data argument in the command below
```shell
HARDHAT_NETWORK=goerli node scripts/airdrop.js --data ./airdrop_data.json
```