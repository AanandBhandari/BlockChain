const SHA256 = require('crypto-js/sha256');

class Block {
    constructor (index,timeStamp,data,previousHash='') {
        this.index = index;
        this.timeStamp = timeStamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash()
        this.noice = 0;
    }
    calculateHash() {
        return SHA256(this.index + this.timeStamp + JSON.stringify(this.data) + this.previousHash +this.noice).toString();
    }
    mineBlock (difficulty) {
        while(this.hash.substring(0,difficulty) !== Array(difficulty+1).join('0')){
            this.noice++;
            this.hash = this.calculateHash()
        }
        console.log('Block mined :' + this.hash);   
    }
}
class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty  = 5; 
    }
    createGenesisBlock() {
        return new Block(0,'09/04/2019','GenesisBlock','0')
    }
    getLatestBlock() {
       return this.chain[this.chain.length-1];
    }
    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty)
        this.chain.push(newBlock);
    }
    isValidChain() {
        for (let i = 1; i <this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];
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

let myCoin = new Blockchain();

console.log('block 1 is mining');
myCoin.addBlock(new Block(1, '10/09/2019', { amount: 4 }))
console.log('block 2 is mining');
myCoin.addBlock(new Block(2, '10/09/2019', { amount: 10 }))