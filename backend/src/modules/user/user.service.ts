import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async findById(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(userId: string, updateDto: UpdateUserDto): Promise<User> {
    const updated = await this.userModel.findByIdAndUpdate(userId, updateDto, {
      new: true,
    });
    if (!updated) throw new NotFoundException('User not found');
    return updated;
  }
}
