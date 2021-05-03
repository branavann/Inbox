const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
    'private key goes here',
    'https://rinkeby.infura.io/v3/16a624b7c1124b048ab4429260e8e423'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    const inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hello'] })
        .send({ from: accounts[0], gas: '1000000' });
    console.log(`The contract was deployed from ${accounts[0]}. The address of the deployed contract is ${inbox.options.address}`);
};

deploy();
