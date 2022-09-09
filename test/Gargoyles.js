const {
  // time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
// const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Gargoyles", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deploy() {
    const [owner, otherAccount] = await ethers.getSigners();

    const Gargoyles = await ethers.getContractFactory("Gargoyles");
    const gargoyles = await Gargoyles.deploy();

    return { gargoyles, owner, otherAccount };
  }

  // describe("Deployment", function () {
  //   it("Should set the right owner", async function () {
  //     const { gargoyles, owner } = await loadFixture(deploy);

  //     expect(await gargoyles.owner()).to.equal(owner.address);
  //   });
  // });
});
