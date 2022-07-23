// const { getNamedAccounts, deployments, network } = require("hardhat")

// function deployFunc() {
//     console.log("hello!")
// }

// module.exports.default = deployFunc

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deplyer } = await getNamedAccounts()
    const chainId = network.config.chainId
}
