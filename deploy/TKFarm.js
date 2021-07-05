module.exports = async function ({ ethers, deployments, getNamedAccounts }) {
  const { deploy } = deployments

  const { deployer, dev } = await getNamedAccounts()

  
  const { address } = await deploy("TKFarm", {
    from: deployer,
    args: [dev, "0"],
    log: true,
    deterministicDeployment: false
  })

  // if (await sushi.owner() !== address) {
    // Transfer Sushi Ownership to Chef
  //  console.log("Transfer Sushi Ownership to Chef")
  //  await (await sushi.transferOwnership(address)).wait()
  // }

  const masterChef = await ethers.getContract("TKFarm")
  if (await masterChef.owner() !== dev) {
    // Transfer ownership of TKFarm to dev
    console.log("Transfer ownership of TKFarm to dev")
    //await (await masterChef.transferOwnership(dev)).wait()
  }
}

module.exports.tags = ["TKFarm"]
// module.exports.dependencies = ["UniswapV2Factory", "UniswapV2Router02", "SushiToken"]
