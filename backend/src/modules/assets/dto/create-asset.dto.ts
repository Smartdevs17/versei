import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsArray, IsBoolean } from 'class-validator';

export class CreateAssetDto {
  @ApiProperty({ description: 'Asset name' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Category of the asset' })
  @IsString()
  category: string;

  @ApiProperty({ required: false, description: 'Description of the asset' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Total number of tokens for the asset' })
  @IsNumber()
  totalTokens: number;

  @ApiProperty({ description: 'Price per token for the asset' })
  @IsNumber()
  tokenPrice: number;

  @ApiProperty({ required: false, description: 'Annual yield rate of the asset' })
  @IsOptional()
  @IsString()
  yieldRate?: string;

  @ApiProperty({ description: 'Owner wallet address' })
  @IsString()
  owner: string;

  @ApiProperty({ description: 'Array of image URLs for the asset', type: [String] })
  @IsArray()
  images: string[];

  @ApiProperty({ required: false, description: 'Appraisal document URL' })
  @IsOptional()
  @IsString()
  appraisal?: string;

  @ApiProperty({ required: false, description: 'Ownership document URL' })
  @IsOptional()
  @IsString()
  ownership?: string;

  @ApiProperty({ description: 'Contract address of the asset' })
  @IsString()
  contractAddress: string;

  @ApiProperty({ required: true, description: 'Lock duration for the asset in days' })
  @IsNumber()
  lockDuration: number;

  @ApiProperty({ description: 'Indicates if the asset is tokenised', default: false })
  @IsOptional()
  @IsBoolean()
  isTokenised: boolean = false;


}
