require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    polygon_amoy: {
      url: "https://polygon-mainnet.g.alchemy.com/v2/z70vrRjDvKTjv5Nj-LrEZweX_Kg0Ot42",
      accounts: ["43dfd9255cbaad2e6692320469d62f6c140f40cc58138e977ad769c98f916cba"],
    },
  },
};
