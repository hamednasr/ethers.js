const { ethers } = require("hardhat")
const { expect, assert } = require("chai")

describe("SimpleStorage", () => {
  let simpleStorageFactory, simpleStorage

  beforeEach(async () => {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
    simpleStorage = await simpleStorageFactory.deploy()
  })

  it("should start with a favorite number of 0", async () => {
    const currentValue = await simpleStorage.retrieve()
    const expectedValue = "0"
    assert.equal(currentValue.toString(), expectedValue)
  })

  it("should update when we call store", async () => {
    const transactionResponse = await simpleStorage.store("5")
    await transactionResponse.wait(1)
    const newValue = await simpleStorage.retrieve()
    const expectedValue = "5"
    assert.equal(newValue.toString(), expectedValue)
  })
})
