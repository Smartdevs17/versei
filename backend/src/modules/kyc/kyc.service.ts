import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { KYCSubmission, KYCSubmissionDocument } from './schema/kyc.schema';
import { SubmitKycDto } from './dto/submit-kyc.dto';
import { User, UserDocument } from '../user/schema/user.schema'; // Add this line

@Injectable()
export class KycService {
  constructor(
    @InjectModel(KYCSubmission.name)
    private readonly kycModel: Model<KYCSubmissionDocument>,

    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>, // Inject user model
  ) {}

  // Submit KYC
  async submitKyc(submitKycDto: SubmitKycDto, userId: string): Promise<KYCSubmission> {
    const kyc = new this.kycModel({
      ...submitKycDto,
      user: userId,
      status: 'pending',
      processedAt: null,
    });

    return kyc.save();
  }

  // Get all KYC submissions
  async findAll(): Promise<KYCSubmission[]> {
    return this.kycModel.find().exec();
  }

  // Get a single KYC submission by ID
  async findOne(id: string): Promise<KYCSubmissionDocument> {
    const kyc = await this.kycModel.findById(id).exec();
    if (!kyc) throw new NotFoundException('KYC Submission not found');
    return kyc;
  }

  // Update KYC status (e.g., approve or reject) and sync with User
  async updateStatus(id: string, status: 'approved' | 'rejected'): Promise<KYCSubmission> {
    const kyc = await this.findOne(id);
    kyc.status = status;
    kyc.processedAt = new Date();
    await kyc.save();

    // Update User if approved
    if (status === 'approved') {
      await this.userModel.findByIdAndUpdate(
        kyc.user,
        {
          kycVerified: true,
          kycInformation: {
            fullName: kyc.fullName,
            companyName: kyc.companyName,
            email: kyc.email,
            country: kyc.country,
            idDocumentPath: kyc.idDocumentPath,
            addressProofPath: kyc.addressProofPath,
            businessLicensePath: kyc.businessLicensePath,
          },
        },
        { new: true }
      );
    }

    return kyc;
  }
}
