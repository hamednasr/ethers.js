const { ethers, run, network } = require("hardhat")

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
  console.log("Deploying Contract....")
  const simpleStorage = await SimpleStorageFactory.deploy()
  // await simpleStorage.deployed()
  console.log(`deployed contract to: ${simpleStorage.address}`)

  if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
    await simpleStorage.deployTransaction.wait(6)
    await verify(simpleStorage.address, [])
  }

  const currentValue = await simpleStorage.retrieve()
  console.log(`current value is: ${currentValue}`)
  // store new value
  const transactionResponse = await simpleStorage.store(8)
  await transactionResponse.wait(1)
  const newValue = await simpleStorage.retrieve()
  console.log(`new value is: ${newValue}`)
}

// async function verify(contractAddress, args)
async function verify(contractAddress, args) {
  console.log("Verifying contract...")
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    })
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified!")
    } else {
      console.log(e)
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
