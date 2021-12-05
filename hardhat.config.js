require("@nomiclabs/hardhat-waffle");

// Replace this private key with your Harmony account private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Be aware of NEVER putting real Ether into testing accounts
const HARMONY_PRIVATE_KEY = "058b0cb00e6cbf786ddb73149f5ad9c085a96f81aeaa245166da68471b9436d6";

module.exports = {
  solidity: "0.7.3",
  networks: {
    testnet: {
      url: `https://api.s0.b.hmny.io`,
      accounts: [`0x${HARMONY_PRIVATE_KEY}`]
    },
    mainnet: {
      url: `https://api.harmony.one`,
      accounts: [`0x${HARMONY_PRIVATE_KEY}`]
    }
  }
};