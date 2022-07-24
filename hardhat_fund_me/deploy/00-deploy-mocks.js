const { network } = require("hardhat")
const {
    developmentChains,
    DECIMALS,
    INITIAL_ANSWERS
} = require("../helper-hardhat-config")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    log(`network name is: ${network.name}`)
    if (chainId == 31337) {
        log("local network detected, deploying mocks...!")
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [DECIMALS, INITIAL_ANSWERS]
        })
        log("mocks deployed!")
        log("**************************************************************")
    }
}
module.exports.tags = ["all", "mocks"]
