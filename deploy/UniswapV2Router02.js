const { WETH } = require("@sushiswap/sdk")

module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy } = deployments

  const { deployer } = await getNamedAccounts()

  const chainId = await getChainId()

  let wethAddress;

  if (chainId === '96') {
    wethAddress = '0x4dD1d9Dd0f3d9C3F6F747F99928C29924A1b42b1'
  } else if (chainId in WETH) {
    wethAddress = WETH[chainId].address
  } else {
    throw Error("No WETH!")
  }

  const factoryAddress = (await deployments.get("UniswapV2Factory")).address

  await deploy("UniswapV2Router02", {
    from: deployer,
    args: [factoryAddress, wethAddress],
    log: true,
    deterministicDeployment: false
  })
}

module.exports.tags = ["UniswapV2Router02", "AMM"]
module.exports.dependencies = ["UniswapV2Factory", "Mocks"]