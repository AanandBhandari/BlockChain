const {Blockchain,Transaction} = require('./blockchain')
let myCoin = new Blockchain();
// myCoin.createTransaction(new Transaction('address1', 'address2', 100))
// myCoin.createTransaction(new Transaction('address2', 'address1', 50))

console.log('\n Starting a miner...');
myCoin.minePendingTransactions('address3');
console.log('\n Balance of address3 is', myCoin.getBalanceOfAddress('address3'));

console.log('\n Starting a miner again...');
myCoin.minePendingTransactions('address3');
console.log('\n Balance of address3 is', myCoin.getBalanceOfAddress('address3'));
console.log('showing blocks', myCoin.chain);
