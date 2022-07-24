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

        it("revert money less than 50$", async function() {
            await expect(fundMe.fund({ value: "1000000000" })).to.be.reverted
        })
    })
})
