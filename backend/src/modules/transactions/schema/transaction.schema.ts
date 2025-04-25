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

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Asset' })
  asset: Asset;

  @Prop({ required: true, enum: ['Profit', 'Transferred', 'Sent', 'Received'] })
  type: string;

  @Prop()
  fromAddress: string;

  @Prop()
  toAddress: string;

  @Prop({ type: MongooseSchema.Types.Decimal128 })
  quantity: number;

  @Prop({ type: MongooseSchema.Types.Decimal128, required: true })
  amount: number;

  @Prop({ default: 'Completed', enum: ['Pending', 'Completed', 'Failed'] })
  status: string;

  @Prop()
  txHash: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);