import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { KycService } from './kyc.service';
import { KycController } from './kyc.controller';
import { KYCSubmission, KYCSubmissionSchema } from './schema/kyc.schema';
import { User, UserSchema } from '../user/schema/user.schema'; // 👈 Import User schema
import { ResponseService } from 'src/framework/response/response.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: KYCSubmission.name, schema: KYCSubmissionSchema },
      { name: User.name, schema: UserSchema }, // 👈 Register User schema here
    ]),
  ],
  controllers: [KycController],
  providers: [KycService, ResponseService],
})
export class KycModule {}
