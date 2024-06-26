require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */

const NEXT_PUBLIC_POLYGON_AMOY_RPC =
  "https://polygon-amoy.g.alchemy.com/v2/z70vrRjDvKTjv5Nj-LrEZweX_Kg0Ot42";

module.exports = {
  solidity: "0.8.24",
  networks: {
    polygon_amoy: {
      url: NEXT_PUBLIC_POLYGON_AMOY_RPC,
      // accounts: [
      //   "43dfd9255cbaad2e6692320469d62f6c140f40cc58138e977ad769c98f916cba",
      // ],
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
