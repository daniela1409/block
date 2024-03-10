import mongoose, { Schema, Document } from 'mongoose';

interface Transaction extends Document {
  timeStamp: number;
  datosAdicionales: any; 
  blockNumber: string;
  hash: string;
  genesis: boolean
}

const TransactionSchema = new Schema({
  timeStamp: Number,
  datosAdicionales: Schema.Types.Mixed,
  blockNumber: String,
  hash: String,
  genesis: Boolean
});

const Transaction = mongoose.model<Transaction>('Transaction', TransactionSchema);

export default Transaction;
