// assets/schemas/user-asset.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.schema';
import { Asset } from 'src/modules/assets/schema/asset.schema';

export type UserAssetDocument = UserAsset & Document;

@Schema({ timestamps: true })
export class UserAsset {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Asset', required: true })
  asset: Asset;

  @Prop({ type: MongooseSchema.Types.Decimal128, required: true })
  tokenBalance: number;

  @Prop({ required: true })
  purchaseDate: Date;
}

export const UserAssetSchema = SchemaFactory.createForClass(UserAsset);