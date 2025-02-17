const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const Multipayment = await hre.ethers.getContractFactory("Multipayment");
  const multipayment = await Multipayment.deploy();
  // await multipayment.deployed();

  console.log("Multipayment deployed to:", multipayment.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
