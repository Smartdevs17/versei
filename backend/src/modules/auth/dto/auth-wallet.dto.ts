import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthWalletDto {
    @ApiProperty({
        example: '0x1234567890abcdef1234567890abcdef12345678',
        description: 'The wallet address of the user',
    })
    @IsString()
    walletAddress: string;
}
