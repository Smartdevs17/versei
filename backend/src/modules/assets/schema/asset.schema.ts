// assets/schemas/asset.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type AssetDocument = Asset & Document;

@Schema({ timestamps: true })
export class Asset {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  category: string;

  @Prop()
  description: string;

  @Prop([String])
  images: string[];

  @Prop({ type: MongooseSchema.Types.Decimal128 })
  totalTokens: number;

  @Prop({ type: MongooseSchema.Types.Decimal128 })
  tokenPrice: number;

  @Prop({ type: MongooseSchema.Types.Decimal128 })
  availableSupply: number;

  @Prop()
  yieldRate: string;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop({ default: false })
  isTokenised: boolean;

  @Prop()
  owner: string;

  @Prop()
  contractAddress: string;

  @Prop({required: true})
  lockDuration: number;

  @Prop({ type: MongooseSchema.Types.Mixed })
  documents: {
    appraisal?: string;
    ownership?: string;
  };
}

export const AssetSchema = SchemaFactory.createForClass(Asset);