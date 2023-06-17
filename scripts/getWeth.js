const { ethers } = require("hardhat");
const AMOUNT = ethers.utils.parseEther("0.01");
async function getWeth() {
  const { deployer } = await getNamedAccounts();
  // abi , contract Address
  //0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
  const WethAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
  const iWeth = await ethers.getContractAt("IWeth", WethAddress, deployer);

  const tx = await iWeth.deposit({ value: AMOUNT });
  await tx.wait(1);
  const wethBalanace = await iWeth.balanceOf(deployer);
  console.log(wethBalanace.toString());
}

module.exports = { getWeth, AMOUNT };
