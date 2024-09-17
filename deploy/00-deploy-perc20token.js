const { network } = require("hardhat");
require("dotenv").config();

module.exports = async ({ deployments, getNamedAccounts }) => {
  const { deployer } = await getNamedAccounts();
  const { deploy, log } = deployments;

  log("Deploying Swisstronik........");
  const PERC20Sample = await deploy("PERC20Sample", {
    from: deployer,
    args: [],
    log: true,
  });
  log(`Contract deployed at ${PERC20Sample.address}`);
};

module.exports.tags = ["all", "PERC20Sample"];
