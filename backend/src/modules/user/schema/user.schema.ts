// users/schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  walletAddress: string;

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop({ default: false })
  kycVerified: boolean;

  @Prop({ default: 'user' })
  role: string;

  @Prop({ type: MongooseSchema.Types.Mixed })
  kycInformation: Record<string, any>;
}

export const UserSchema = SchemaFactory.createForClass(User);