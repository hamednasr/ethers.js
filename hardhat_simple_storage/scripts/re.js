const { ethers } = require("hardhat")

async function main() {
  const simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
  console.log("contract deploying...")
  const simpleStorage = await simpleStorageFactory.deploy()
  console.log(`deployed contract to: ${simpleStorage.address}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
