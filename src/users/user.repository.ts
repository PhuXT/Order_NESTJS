import { InjectModel } from '@nestjs/mongoose';
import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { UserCreateDto } from './dto/UserCreate.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // LOGIN
  async logIn(email: string, password: string): Promise<User> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      throw new ForbiddenException();
    }
    return Promise.resolve(user);
  }
  // CREATE USER
  async create(userCreateDto: UserCreateDto): Promise<User> {
    const user = await this.userModel.findOne({ email: userCreateDto.email });
    if (user) throw new BadRequestException('Email exist');
    const newUser = new this.userModel(userCreateDto);
    return await newUser.save();
  }
}
