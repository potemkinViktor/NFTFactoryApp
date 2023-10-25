import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-etherscan";
import "hardhat-gas-reporter";

import { constants } from "ethers";
import dotenv from "dotenv";

dotenv.config();

const MUMBAI_API_URL = process.env.MUMBAI_API_URL ?? constants.HashZero;
const POLYGON_API_URL = process.env.POLYGON_API_URL ?? constants.HashZero;

const MUMBAI_PRIVATE_KEY = process.env.MUMBAI_PRIVATE_KEY ?? constants.HashZero;
const POLYGON_PRIVATE_KEY =
  process.env.POLYGON_PRIVATE_KEY ?? constants.HashZero;

const MUMBAI_ETHERSCAN_API_KEY = process.env.MUMBAI_ETHERSCAN_API_KEY;
const POLYGON_ETHERSCAN_API_KEY = process.env.POLYGON_ETHERSCAN_API_KEY;

const config: any = {
  solidity: {
    compilers: [
        {
          version: "0.8.19",
          settings: {
            optimizer: {
              enabled: true,
              runs: 200,
            },
          },
      },
    ],
},
  networks: {
    hardhat: {},
    mainnet: {
      url: POLYGON_API_URL,
      accounts: [POLYGON_PRIVATE_KEY],
    },
    mumbai: {
      url: MUMBAI_API_URL,
      accounts: [MUMBAI_PRIVATE_KEY],
    },
  },
  gasReporter: {
    currency: "USD",
    gasPrice: 30,
    coinmarketcap: process.env.COINMARKETCAP_KEY,
    enabled: true,
  },
  etherscan: {
    apiKey: {
      mainnet: POLYGON_ETHERSCAN_API_KEY!,
      mumbai: MUMBAI_ETHERSCAN_API_KEY!,
    },
    customChains: [
      {
        network: "mumbai",
        chainId: 80001,
        urls: {
          apiURL: "https://api-testnet.polygonscan.com/api",
          browserURL: "https://mumbai.polygonscan.com/",
        },
      },
    ],
  },
};

export default config;
