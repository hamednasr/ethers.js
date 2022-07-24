const { deployments, ethers, getNamedAccounts } = require("hardhat")
const { assert, expect } = require("chai")

describe("FundMe", function() {
    let fundMe
    let MockV3Aggregator
    let deployer
    beforeEach(async function() {
        deployer = (await getNamedAccounts()).deployer
        await deployments.fixture(["all"])
        fundMe = await ethers.getContract("FundMe", deployer)
        MockV3Aggregator = await ethers.getContract(
            "MockV3Aggregator",
            deployer
        )
    })

    describe("constructor", function() {
        it("sets the aggregator addresses correctly", async function() {
            const response = await fundMe.priceFeed()
            assert.equal(response, MockV3Aggregator.address)
        })
    })

    describe("fund", function() {
        it("fails if not enough money sent!", async function() {
            await expect(fundMe.fund()).to.be.revertedWith(
                "you should pay more!"
            )
        })

        // it("revert money less than 50$", async function() {
        //     await expect(fundMe.fund({ value: "1000000000" })).to.be.reverted
        // })

        it("update the amount funded", async function() {
            await fundMe.fund({ value: "1000000000000000000" })
            const response = await fundMe.addressToAmountFunded(deployer)
            assert.equal(response, "1000000000000000000")
        })

        it("adds a new funder to array", async function() {
            await fundMe.fund({ value: "1000000000000000000" })
            const funder = await fundMe.funders(0)
            assert.equal(funder, deployer)
        })
    })

    const sendValue = ethers.utils.parseEther("1")

    describe("withdraw", function() {
        beforeEach(async () => {
            await fundMe.fund({ value: sendValue })
        })
        // it("withdraws ETH from a single funder", async () => {
        //     // Arrange
        //     const startingFundMeBalance =
        //         await fundMe.provider.getBalance(fundMe.address)
        //     const startingDeployerBalance =
        //         await fundMe.provider.getBalance(deployer)

        //     // Act

        //     const transactionResponse = await fundMe.withdraw()
        //     const transactionReceipt = await transactionResponse.wait(1)

        //     const { gasUsed, effectiveGasPrice } = transactionReceipt
        //     const gasCost = gasUsed.mul(effectiveGasPrice)

        //     const endingFundMeBalance = await fundMe.provider.getBalance(
        //         fundMe.address
        //     )
        //     const endingDeployerBalance =
        //         await fundMe.provider.getBalance(deployer)

        it("only owner can withdraw funds", async function() {
            const accounts = ethers.getSigners()
            const attacker = accounts[1]
        })
    })
})
