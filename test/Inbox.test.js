const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider);
const { interface, bytecode } = require('../compile');

let accounts; 
let inbox;
const INITIAL_STRING = 'what up doe';
const NEW_STRING = 'hello there';
const THOMAS = 0;

beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts()

    // Deploy contract from one account
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: [INITIAL_STRING] })
        .send({ from: accounts[0], gas: '1000000' });
    inbox.setProvider(provider);
    });

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address);
    });

    it('has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(INITIAL_STRING, message);
    });

    it('can update a message', async () => {
        await inbox.methods.setMessage(NEW_STRING).send({ from: accounts[THOMAS] });
        const message = await inbox.methods.message().call();
        assert.equal(NEW_STRING, message);
    });
});