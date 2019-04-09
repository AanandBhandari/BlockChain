const SHA256 = require('crypto-js/sha256');

class Block {
    constructor (index,timeStamp,data,previousHash='') {
        this.index = index;
        this.timeStamp = timeStamp;
        this.data = previousHash;
        this.hash = this.calculateHash()
    }
    calculateHash() {
        return SHA256(this.index + this.timeStamp + JSON.stringify(this.data) + this.previousHash).toString();
    }
}
class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }
    createGenesisBlock() {
        return new Block(0,'09/04/2019','GenesisBlock','0')
    }
    getLatestBlock() {
       return this.chain[this.chain.length-1];
    }
    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}