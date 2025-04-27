// dto/create-transaction.dto.ts

import { IsEnum, IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { Asset } from 'src/modules/assets/schema/asset.schema';
import { User } from 'src/modules/user/schema/user.schema';

export class CreateTransactionDto {
  @IsNotEmpty()
  user: User;

  @IsOptional()
  asset?: Asset;

  @IsEnum(['Profit', 'Buy', 'Sell', 'Transferred', 'Sent', 'Received'])
  @IsNotEmpty()
  type: string;

  @IsOptional()
  @IsString()
  fromAddress?: string;

  @IsOptional()
  @IsString()
  toAddress?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  quantity?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  amount?: number;

  @IsNotEmpty()
  @IsEnum(['Pending', 'Completed', 'Failed'])
  status: string;

  @IsOptional()
  @IsString()
  txHash?: string;
}
