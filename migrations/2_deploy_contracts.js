var Token = artifacts.require("Token.sol");
var ProxyAdmin = artifacts.require("ProxyAdmin.sol");
var TransparentUpgradeableProxy = artifacts.require("TransparentUpgradeableProxy.sol");

module.exports = async function(deployer) {
        await deployer.deploy(Token);
        await deployer.deploy(ProxyAdmin);
        

        const token = await Token.deployed();
        const proxyAdmin = await ProxyAdmin.deployed();

        await deployer.deploy(TransparentUpgradeableProxy, token.address, proxyAdmin.address, '0x');
};
