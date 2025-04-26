// transactions/schemas/transaction.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Asset } from 'src/modules/assets/schema/asset.schema';
import { User } from 'src/modules/user/schema/user.schema';

export type TransactionDocument = Transaction & Document;

@Schema({ timestamps: true })
export class Transaction {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Asset', required: false })
  asset?: Asset;

  @Prop({
    required: true,
    enum: ['Profit', 'Buy', 'Sell', 'Transferred', 'Sent', 'Received'],
  })
  type: string;

  @Prop({ required: false })
  fromAddress?: string;

  @Prop({ required: false })
  toAddress?: string;

  // Quantity of tokens, always whole numbers
  @Prop({ type: Number, required: false })
  quantity?: number;

  // Amount in WEI, whole number, required only for value-based tx types
  @Prop({
    type: Number,
    required: function (this: Transaction) {
      return ['Profit', 'Buy', 'Sell'].includes(this.type);
    },
  })
  amount?: number;

  @Prop({
    default: 'Completed',
    enum: ['Pending', 'Completed', 'Failed'],
  })
  status: string;

  @Prop({ required: false })
  txHash?: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
