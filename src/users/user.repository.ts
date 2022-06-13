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

  // find
  async find(email: string): Promise<User> {
    return await this.userModel.findOne({ email });
  }
  // CREATE USER
  async create(userCreateDto: UserCreateDto): Promise<User> {
    const user = await this.userModel.findOne({ email: userCreateDto.email });
    if (user) throw new BadRequestException('Email exist');
    const newUser = new this.userModel(userCreateDto);
    return await newUser.save();
  }
}
