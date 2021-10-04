var TokenV2 = artifacts.require("TokenV2.sol");
var ProxyAdmin = artifacts.require("ProxyAdmin.sol");
var TransparentUpgradeableProxy = artifacts.require("TransparentUpgradeableProxy.sol");

module.exports = async function(deployer) {
        await deployer.deploy(TokenV2);
        const tokenV2 = await TokenV2.deployed();
        const proxyAdmin = await ProxyAdmin.deployed();
        const proxyToken = await TransparentUpgradeableProxy.deployed();
        
        proxyAdmin.upgrade(proxyToken.address, tokenV2.address);
};