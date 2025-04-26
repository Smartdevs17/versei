import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class SubmitKycDto {
  @ApiProperty({ description: 'Full name of the user' })
  @IsString()
  fullName: string;

  @ApiProperty({ required: false, description: 'Company name (if applicable)' })
  @IsOptional()
  @IsString()
  companyName?: string;

  @ApiProperty({ description: 'Email of the user' })
  @IsString()
  email: string;

  @ApiProperty({ description: 'Country of the user' })
  @IsString()
  country: string;

  @IsOptional()
  @ApiProperty({ type: String, example: 'https://your-storage.com/uploads/id-doc.pdf' })
  idDocumentPath?: string;
  

  @ApiProperty({ required: false, description: 'https://your-storage.com/uploads/id-doc.pdf' })
  @IsOptional()
  @IsString()
  addressProofPath?: string;

  @ApiProperty({ required: false, description: 'https://your-storage.com/uploads/id-doc.pdf' })
  @IsOptional()
  @IsString()
  businessLicensePath?: string;
}
