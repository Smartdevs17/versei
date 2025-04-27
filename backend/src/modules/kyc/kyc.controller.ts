import { Controller, Post, Body, UseGuards, Request, Param, Put } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { KycService } from './kyc.service';
import { SubmitKycDto } from './dto/submit-kyc.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResponseService } from 'src/framework/response/response.service';

@ApiTags('KYC')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('kyc')
export class KycController {
  constructor(
    private readonly kycService: KycService,
    private readonly responseService: ResponseService
  ) {}

  @Post()
  async submitKyc(@Body() submitKycDto: SubmitKycDto, @Request() req) {
    try {
      const result = await this.kycService.submitKyc(submitKycDto, req.user.userId);
      return this.responseService.success({ data: result, message: 'KYC submitted successfully' });
    } catch (error) {
      return this.responseService.error({ message: 'Failed to submit KYC', errors: error.message });
    }
  }

  @Put(':id/status')
  async updateStatus(@Param('id') id: string, @Body() status: { status: 'approved' | 'rejected' }) {
      if (!['approved', 'rejected'].includes(status.status)) {
        return this.responseService.error({ message: 'Invalid status', errors: 'Status must be either approved or rejected', code: 400}, );
      }
      const kyc = await this.kycService.findOne(id);;
      if (!kyc) {
        return this.responseService.error({ message: 'KYC not found', errors: 'No KYC submission found with the provided ID', code: 404 });
      }
      const result = await this.kycService.updateStatus(id, status.status);
      return this.responseService.success({ data: result, message: 'KYC status updated successfully' });
  }
}