const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const { interface, bytecode } = require('../compile');

const web3 = new Web3(ganache.provider());

let accounts;
let inbox;
const initialString = 'Hello'

beforeEach( async () => {
    accounts = await web3.eth.getAccounts();
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: [initialString] })
        .send({ from: accounts[0], gas: '1000000' })
});

describe('Inbox', () => {
    it('Deploys a contract', () => {
        assert.ok(inbox.options.address);
    });

    it('Default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, initialString);
    });

    it('Message modifier', async () => {
        // .send() returns the transaction hash
        await inbox.methods.setMessage('This is a new message').send({ from: accounts[0] });
        const newMessage = await inbox.methods.message().call();
        assert.equal(newMessage, 'This is a new message');
    })
});
 