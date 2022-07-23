// const { getNamedAccounts, deployments, network } = require("hardhat")

// function deployFunc() {
//     console.log("hello!")
// }

// module.exports.default = deployFunc

const { networkConfig } = require("../helper-hardhat-config.js")
const { network } = require("hardhat")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]

    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [ethUsdPriceFeedAddress],
        log: true
    })
}
