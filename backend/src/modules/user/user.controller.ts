import { Controller, Get, Put, Body, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ResponseService } from 'src/framework/response/response.service';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly responseService: ResponseService
  ) {}

  @Get('me')
  async getProfile(@Request() req) {
    try {
      const result = await this.userService.findById(req.user.userId);
      return this.responseService.success({ data: result, message: 'User profile retrieved successfully' });
    } catch (error) {
      return this.responseService.error({ message: 'Failed to retrieve user profile', errors: error.message });
    }
  }

  @Put('me')
  async updateProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    try {
      const result = await this.userService.update(req.user.userId, updateUserDto);
      return this.responseService.success({ data: result, message: 'User profile updated successfully' });
    } catch (error) {
      return this.responseService.error({ message: 'Failed to update user profile', errors: error.message });
    }
  }
}