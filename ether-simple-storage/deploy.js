const ethers = require("ethers");
const fs = require("fs");

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    "HTTP://127.0.0.1:7545"
  );

  const wallet = new ethers.Wallet(
    "ce641621ce3a61940683a40d2e23940a79bd0beaa7b1ff28e72b9170cdf16e9e",
    provider
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
