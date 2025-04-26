import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthWalletDto } from './dto/auth-wallet.dto';
import { ResponseService } from 'src/framework/response/response.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly responseService: ResponseService
  ) {}

  @Post('wallet')
  async loginWithWallet(@Body() authDto: AuthWalletDto) {
    try {
      const result = await this.authService.validateOrCreateUser(authDto.walletAddress);
      return this.responseService.success({ data: result, message: 'Login successful' });
    } catch (error) {
      return this.responseService.error({ message: 'Login failed', errors: error.message });
    }
  }
}