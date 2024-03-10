import {createHash} from 'crypto';

export const hashStrings = (string: string) => {
    const hash = createHash('sha256');
    hash.update(string);
    const hashHexa = hash.digest('hex');

    return(hashHexa);
}

export const generateMerkleTree = (transactions) => {
    let arrayHashTransactios = [];
    let rootHash = '';

    for(let i = 0; i < transactions.length; i = i + 2){
        arrayHashTransactios.push(hashStrings(transactions[i].concat(transactions[i+1])));
    }

    if(arrayHashTransactios.length === 1){
        rootHash = arrayHashTransactios[0];
    }else{
        rootHash = generateMerkleTree(arrayHashTransactios);
    }

    return rootHash;
}

export const getNonceToHash = (message: string) => {

    var numberInit = Math.floor(20 * 0xFFFF);
    var hash = "";
    var hashedMessage = "";
    
    while(hash.substring(0,2) !== "00"){
        hashedMessage = message.concat(numberInit.toString()); 
        hash = hashStrings(hashedMessage);
        numberInit++;
    }

    return  {
        "hash": hash,
        "Nonce": numberInit
    }
}