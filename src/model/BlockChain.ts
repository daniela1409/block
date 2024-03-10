import mongoose, { Schema, Document } from 'mongoose';

interface BlockChain extends Document {
  blocksNumber: number;
  hashLastBlockOfChain: string;
  hashPrevious: string;
}

const BlockChainSchema = new Schema({
    blocksNumber: Number,
    hashLastBlockOfChain: String,
    hashPrevious: String
});

const BlockChain = mongoose.model<BlockChain>('BlockChain', BlockChainSchema);

export default BlockChain;