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