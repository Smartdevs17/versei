import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/modules/user/schema/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) {}

  async validateOrCreateUser(walletAddress: string): Promise<any> {
    let user = await this.userModel.findOne({ walletAddress });

    if (!user) {
      user = new this.userModel({ walletAddress });
      await user.save();
    }

    const payload = { walletAddress: user.walletAddress, sub: user._id };
    return {
      accessToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRATION,
        privateKey: process.env.JWT_PRIVATE_KEY,
      }),
      user,
    };
  }
}
