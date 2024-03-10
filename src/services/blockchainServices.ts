import {createHash} from 'crypto';
import Transaction from '../model/transactions';
import Block from '../model/Block';
import { generateMerkleTree, getNonceToHash, hashStrings } from '../utils/Utils';
import BlockChain from '../model/BlockChain';

export const getHashString = async (jsonTransaction: JSON) => {
    const tranaction = await generationTransaction(jsonTransaction);

    // const hash = createHash('sha256');
    // hash.update(tranaction);
    // let tranactionDB = new Transaction();
    // const hashHexa = hash.digest('hex');

    // tranactionDB.timeStamp = Date.now();
    // tranactionDB.datosAdicionales = jsonTransaction 
    // tranactionDB.blockNumber = 1;
    // tranactionDB.hash = hashHexa;

    // try{
    //     const tran = await tranactionDB.save();
    //     //const prueba = await Transaction.findById('65eba7e8fa7d21180e772e18');
    //     //console.log("prueba", prueba);
    // }catch(error){
    //     console.log(error);
    // }
    
    
    // return hashHexa;
}

export const generationTransaction = async(transactionJson: JSON) => {
    const tranaction = JSON.stringify(transactionJson);

    const hash = hashStrings(tranaction);

    if(transactionJson['valueInWallet'] > (transactionJson['fee'] + transactionJson['valueTransaction'])){
        let tranactionDB = new Transaction();
        tranactionDB.timeStamp = Date.now();
        tranactionDB.datosAdicionales = transactionJson;
        tranactionDB.hash = hash;
        tranactionDB.genesis = false;

        const block = await managgeBlock(tranactionDB);
        if(block.transactionQuantity !== null ){
            tranactionDB.blockNumber = block.id;
            if(block.transactionQuantity === 1 && block.isTheGenesis){
                tranactionDB.genesis = true;
                console.log("base coin detectada")
            }
        }

        try{
            const tran = await tranactionDB.save();
        }catch(error){
            console.log(error);
        }
    }
    return tranaction;
}

const managgeBlock = async(transaction: Transaction) => {
    let block = null;

    const blocks= await Block.find({'isLastBlock': true});
    if(blocks.length === 0){
        block = new Block();
        block.timeStamp = Date.now();
        block.transactionQuantity = 1;
        block.isLastBlock = true;
        block.isTheGenesis = true;
        block.isComfirmed = false;
    
        const result = await block.save();
        console.log(result.id);
    }
    else if (blocks[0].transactionQuantity < 4){
        block = blocks[0];
        block.timeStamp = Date.now();
        block.transactionQuantity = block.transactionQuantity + 1;
        block.isLastBlock = true;
        block.isComfirmed = false;
        const result = await block.save();
    }
    else {
        block = new Block();
        block.timeStamp = Date.now();
        block.transactionQuantity = 1;
        block.isLastBlock = true;
        block.isTheGenesis = false;
        block.isComfirmed = false;
        blocks[0].isLastBlock = false;
        blocks[0].save();
        const result = await block.save();
    }
    return block;
}

export const getBlocksToUndermine = async() => {
    const blocks = await Block.find({'transactionQuantity': 4, 'readyToConfirm': false, 'isComfirmed': false});

    console.log(blocks[0]);
    return blocks;
}

export const undermineBlockService = async(blockId) => {
    const tranactionDB = await Transaction.find({'blockNumber': blockId});
    const blockDB = await Block.findById(blockId);
    if(blockDB.transactionQuantity === 4){
        const arrayTransactions = tranactionDB.map(tranaction => tranaction.hash);
        blockDB.hashMerkleRoot = generateMerkleTree(arrayTransactions);
    
        let isLastBlockDB = await Block.findOne({ isComfirmed: true }).sort({ timeStamp: -1 });
        let blockChain = null;
        if(isLastBlockDB){
            blockDB.hashPrevious = isLastBlockDB.hash;
            blockChain = await BlockChain.findById(isLastBlockDB.blockChainNumber);
            console.log(blockChain.id);
        }
    
        if(blockDB.isTheGenesis && blockDB.hash === undefined){
            blockDB.hashPrevious = '0'; 
            blockDB.isLastBlock = true;
            blockChain = new BlockChain();
        }
    
        const {hash, Nonce} = getNonceToHash(blockDB.hashMerkleRoot.concat(blockDB.hashPrevious));
        blockDB.hash = hash;
        blockDB.nonce = Nonce;
        // if(blockChain){
        //     if(blockDB.hash === undefined){
        //         blockDB.hash = hash;
        //         blockDB.nonce = Nonce;
        //         // blockChain.hashPrevious = (blockDB.isTheGenesis) ? hash : blockChain.hashLastBlockOfChain;
        //         // blockChain.hashLastBlockOfChain = blockDB.hash;
        //         // blockChain.blockNumber = (blockDB.isTheGenesis && blockDB.hash === null) ? 1 : blockChain.blockNumber + 1;
        //     }
        // }else{
        //     if(blockDB.hash === undefined){
        //         blockDB.hash = hash;
        //         blockDB.nonce = Nonce;
        //         // blockChain = new BlockChain();
        //         // blockChain.hashPrevious = blockChain.hashLastBlockOfChain;
        //         // blockChain.hashLastBlockOfChain = blockDB.hash;
        //         // blockChain.blockNumber =  blockChain.blockNumber + 1;
        //     }
        // }

        
        if(blockChain !== null){
            blockDB.timeStamp = Date.now();
            const blockChainSaved = await blockChain.save();
            blockDB.readyToConfirm = true;
            blockDB.blockChainNumber =  blockChainSaved.id;
            blockDB.save();
    
        }
    }
    
}

export const getBlocksToConfirm = async(blockId: string) => {
    const blocks = await Block.find({'readyToConfirm': true});
    return blocks;
}

export const confirmTheBlock = async (blockId: string) => {

    const tranactionDB = await Transaction.find({'blockNumber': blockId});
    let transactionsValid = [];

    tranactionDB.forEach(function(transaction) {
        if(validTransaction(transaction)){
            transactionsValid.push(transaction);
        }
    });

    const arrayTransactions = transactionsValid.map(tranaction => tranaction.hash);
    const hashMerkleRoot = generateMerkleTree(arrayTransactions);

    const blockDB = await Block.findById(blockId);
    let isLastBlockDB = await Block.findOne({ isComfirmed: true }).sort({ timeStamp: -1 });
    let hashPreviousBlock = null;
    if(blockDB.isTheGenesis == true){
        hashPreviousBlock = 0;
    }
    if(isLastBlockDB){
        hashPreviousBlock = isLastBlockDB.hash;
    }

    let blockChain = null;
    const {hash,Nonce} = getNonceToHash(hashMerkleRoot.concat(hashPreviousBlock));

    if(hash === blockDB.hash && Nonce === blockDB.nonce){
        console.log("same");
        blockChain = await BlockChain.findById(blockDB.blockChainNumber);
        blockChain.hashPrevious = (blockDB.isTheGenesis) ? hash : blockChain.hashLastBlockOfChain;
        blockChain.hashLastBlockOfChain = blockDB.hash;
        blockChain.blockNumber = (blockDB.isTheGenesis) ? 1 : blockChain.blockNumber + 1;
    }
        
    if(blockChain !== null){
        blockDB.timeStamp = Date.now();
        const blockChainSaved = await blockChain.save();
        blockDB.readyToConfirm = true;
        blockDB.blockChainNumber =  blockChainSaved.id;
        blockDB.isComfirmed = true;
        blockDB.readyToConfirm = false;
        blockDB.save();
    }
}

const validTransaction = (transaction) => {
    return (transaction.datosAdicionales['valueInWallet'] > (transaction.datosAdicionales['fee'] + transaction.datosAdicionales['valueTransaction']));
}
