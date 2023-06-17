require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

require("@nomiclabs/hardhat-solhint");

require("hardhat-gas-reporter");
require("hardhat-deploy");

/** @type import('hardhat/config').HardhatUserConfig */

const GOERLI_API_KEY = process.env.GOERLI_API_KEY || "http://eth-goerli";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xkey";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "key";
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY;

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.8",
      },
      {
        version: "0.6.12",
      },
      {
        version: "0.4.19",
      },
    ],
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    player: {
      default: 1,
    },
  },

  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
      blockConfirmations: 1,
    },
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/${GOERLI_API_KEY}`,
      accounts: [PRIVATE_KEY],
      chainId: 5,
      blockConfirmations: 6,
    },
  },
};
