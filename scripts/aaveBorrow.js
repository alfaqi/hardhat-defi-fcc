const { ethers } = require("hardhat");
const { getWeth, AMOUNT } = require("./getWeth");

async function main() {
  await getWeth();

  const { deployer } = await getNamedAccounts();
  const lendingPool = await getLendingPool(deployer);

  const wethTokenAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

  await getBorrowUserData(lendingPool, deployer);

  await approveErv20(wethTokenAddress, lendingPool.address, AMOUNT, deployer);
  console.log("Depositing WETH...");
  await lendingPool.deposit(wethTokenAddress, AMOUNT, deployer, 0);
  console.log("Deposited!");

  await getBorrowUserData(lendingPool, deployer);
}

async function approveErv20(erc20Address, spenderAddress, amount, signer) {
  const erc20Token = await ethers.getContractAt("IERC20", erc20Address, signer);
  const txResponse = await erc20Token.approve(spenderAddress, amount);
  await txResponse.wait(1);
  console.log("Approved!");
}

async function getLendingPool(account) {
  const lendingPoolAddressesProvider = await ethers.getContractAt(
    "ILendingPoolAddressesProvider",
    "0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5",
    account
  );
  const lendingPoolAddress =
    await lendingPoolAddressesProvider.getLendingPool();
  const lendingPool = await ethers.getContractAt(
    "ILendingPool",
    lendingPoolAddress,
    account
  );
  return lendingPool;
}

async function getBorrowUserData(lendingPool, account) {
  const { totalCollateralETH, totalDebtETH, availableBorrowsETH } =
    await lendingPool.getUserAccountData(account);

  console.log(`You have ${totalCollateralETH} worth of ETH deposited.`);
  console.log(`You have ${totalDebtETH} worth of ETH borrowed.`);
  console.log(`You can borrow ${availableBorrowsETH} worth of ETH.`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
