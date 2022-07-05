const ethers = require("ethers");
const fs = require("fs-extra");

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://192.168.0.102:8545"
  );

  const wallet = new ethers.Wallet(
    "178f966e1fadc7898ec54072ff15d0b8f5e7d8e9068f583572e4934431ad6da9",
    provider
  );

  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, please wait for a while...!");
  const contract = await contractFactory.deploy();
  const transactionReceipt = await contract.deployTransaction.wait(1);
  console.log("deployment transaction.....:");
  console.log(contract.deployTransaction);
  console.log("transaction receipt.....:");
  console.log(transactionReceipt);
}
// git push -u origin main

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
