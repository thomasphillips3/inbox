const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('Web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
    'verify view whale gloom slow squeeze despair addict return rotate guard young',
    'https://rinkeby.infura.io/v3/bcec170506334d53ad8215f9d8c97143'
);
const web3 = new Web3(provider);