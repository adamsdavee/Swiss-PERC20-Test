const hre = require("hardhat");
const { encryptDataField, decryptNodeResponse } = require("@swisstronik/utils");

const sendShieldedTransaction = async (signer, destination, data, value) => {
  const rpclink = hre.network.config.url;
  const [encryptedData] = await encryptDataField(rpclink, data);
  return await signer.sendTransaction({
    from: signer.address,
    to: destination,
    data: encryptedData,
    value,
  });
};

async function main() {
  const contractAddress = "0x1b5619EB448B3C5F1E44CcD4Ef5e1813A53E98fF";
  const [signer] = await hre.ethers.getSigners();
  const contractFactory = await hre.ethers.getContractFactory("PERC20Sample");
  const contract = contractFactory.attach(contractAddress);
  const functionName = "mint";
  const addressToSend = "0x16af037878a6cAce2Ea29d39A3757aC2F6F7aac1";
  const amount = ethers.parseEther("100");
  const txResponse = await sendShieldedTransaction(
    signer,
    contractAddress,
    contract.interface.encodeFunctionData(functionName, [
      addressToSend,
      amount,
    ]),
    0
  );
  await txResponse.wait();
  console.log("Transaction Receipt: ", txResponse);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
