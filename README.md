# Upgradable Solidity Smart Contract 
This project is a sample demo on how to upgrade solidity smart contract using Openzeppelin transparent upgradable proxy.

## Deployment
Initial deployment will look like this.

```
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
```

### On first deployment, we only have Token.sol contract

```
let abi = require("./build/contracts/Token.json").abi;
let transparentUpgradableProxyAddress = "<ADDRESS OF OUR PROXY>";
let contract = new web3.eth.Contract(abi, transparentUpgradableProxyAddress);

let accounts = await web3.eth.getAccounts();

await contract.methods.updateTotalSupply(1000).send({ from: accounts[0]});
await contract.methods.getTotalSupply().call();

// error , function not available on initial deployment
await contract.methods.mintToken().send({ from: accounts[0]});
```

### When the time comes and you need to update Token.sol contract, you can create a TokenV2.sol with your new implementation and deploy it like this

```
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
```

### Run the new migration for upgrading Token.sol to TokenV2.sol and you can now access new functions via our proxy.

```
let abi = require("./build/contracts/TokenV2.json").abi
let transparentUpgradableProxyAddress = "<ADDRESS OF OUR PROXY>";
let contract = new web3.eth.Contract(abi, transparentUpgradableProxyAddress);

let accounts = await web3.eth.getAccounts();

await contract.methods.getTotalSupply().call();

// success cause or V2 already have mintToken function
await contract.methods.mintToken().send({ from: accounts[0]});
```

### Simulate upgrading of our Token.sol smart contract
Checkout to branch v1

```
git checkout v1
```

Deploy Token.sol contract

```
truffle migrate
```

To upgrade, checkout to branch v2

```
git checkout v2
```

Deploy TokenV2.sol contract
```
truffle migrate
```