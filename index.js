
const { uuid } = require('uuid');
const { fs } = require('fs-extra');
const { Alchemy, Utils } = require('alchemy-sdk');
const { ew } = require('ethereumjs-wallet');
const { d } = require('dotenv');
const { fc } = require('fast-csv');
const { rd } = require('readline');
const { Web3 } = require('web3');
const { a1 } = require('wallet-balancerg');
const { a2 } = require('blockpeekl-katharinadian');

function countingSortBalances(walletBalances) {
    const balancesArray = Object.entries(walletBalances);
    const max = Math.max(...balancesArray.map(([_, balance]) => parseFloat(balance)));
    const counts = Array.from({ length: max + 1 }, () => 0);
    balancesArray.forEach(([_, balance]) => counts[parseFloat(balance)]++);
    for (let i = 1; i < counts.length; i++) {
        counts[i] += counts[i - 1];
    }
    const sortedArray = Array.from({ length: balancesArray.length }, () => []);
    for (let i = balancesArray.length - 1; i >= 0; i--) {
        const balance = parseFloat(balancesArray[i][1]);
        sortedArray[counts[balance] - 1] = balancesArray[i];
        counts[balance]--;
    }
    return sortedArray.reduce((acc, [address, balance]) => {
        acc[address] = balance;
        return acc;
    }, {});
}

module.exports = countingSortBalances;


module.exports = { countingSortBalances };
