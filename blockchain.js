const SHA256 = require('crypto-js/sha256');

class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

class Block {
    constructor(timeStamp, transaction, previousHash = '') {
        this.timeStamp = timeStamp;
        this.transaction = transaction;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.noice = 0;
    }
    calculateHash() {
        return SHA256(this.index + this.timeStamp + JSON.stringify(this.data) + this.previousHash + this.noice).toString();
    }
    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this.noice++;
            this.hash = this.calculateHash()
        }

        console.log('Block mined :' + this.hash);
    }
}
class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 2;
        // pending transaction because block is created and altered one at a time in certain interval
        this.pendingTransactions = [];
        this.miningReward = 100;
    }
    createGenesisBlock() {
        return new Block(0, '09/04/2019', 'GenesisBlock', '0')
    }
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }
    // addBlock(newBlock) {
    //     newBlock.previousHash = this.getLatestBlock().hash;
    //     newBlock.mineBlock(this.difficulty)
    //     this.chain.push(newBlock);
    // }
    minePendingTransactions(miningRewardAddress) {
        let block = new Block(Date.now(), this.pendingTransactions);
        block.mineBlock(this.difficulty);
        this.chain.push(block);
        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ];
    }
    createTransaction(transaction) {
        this.pendingTransactions.push(transaction);
    }
    getBalanceOfAddress(address) {
        let balance = 0;
        for (const block of this.chain) {
            for (const trans of block.transaction) {
                if (trans.fromAddress === address) {
                    balance -= trans.amount
                }
                if (trans.toAddress === address) {
                    balance += trans.amount
                }
            }
        }
        return balance;
    }
    isValidChain() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
            return true;

        }
    }
}
module.exports = {
    Blockchain,Transaction
}