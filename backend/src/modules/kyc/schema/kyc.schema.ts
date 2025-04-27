// kyc/schemas/kyc.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/modules/user/schema/user.schema';

export type KYCSubmissionDocument = KYCSubmission & Document;

@Schema({ timestamps: true })
export class KYCSubmission {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ required: true })
  fullName: string;

  @Prop()
  companyName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  country: string;

  @Prop()
  idDocumentPath: string;

  @Prop()
  addressProofPath: string;

  @Prop()
  businessLicensePath: string;

  @Prop({ default: 'pending', enum: ['pending', 'approved', 'rejected'] })
  status: string;

  @Prop()
  processedAt: Date;
}

export const KYCSubmissionSchema = SchemaFactory.createForClass(KYCSubmission);