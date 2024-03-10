import mongoose, { Schema, Document } from 'mongoose';

interface Block extends Document {
  timeStamp: number;
  hash: string;
  hashPrevious: string;
  nonce: number;
  transactionQuantity: number;
  isTheGenesis: boolean,
  isLastBlock: boolean;
  isComfirmed: boolean;
  hashMerkleRoot: string;
  blockChainNumber: string;
  readyToConfirm: Boolean;
}

const BlockSchema = new Schema({
    timeStamp: Number,
    hash: String,
    hashPrevious: String,
    nonce: Number,
    transactionQuantity: Number,
    isLastBlock: Boolean,
    isTheGenesis: Boolean,
    isComfirmed: Boolean,
    hashMerkleRoot: String,
    blockChainNumber: String,
    readyToConfirm: Boolean
});

const Block = mongoose.model<Block>('Block', BlockSchema);

export default Block;