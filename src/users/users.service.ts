import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { UserCreateDto } from './dto/UserCreate.dto';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}
  // FIND USER
  async findByEmail(email: string) {
    return this.userRepository.find(email);
  }

  // REGISTER
  async create(userCreateDto: UserCreateDto): Promise<unknown> {
    const saltOrRounds = 10;
    const hashPassword = await bcrypt.hash(
      userCreateDto.password,
      saltOrRounds,
    );
    userCreateDto.password = hashPassword;

    const newUser = await this.userRepository.create(userCreateDto);
    return newUser;
  }

  // Get Orders
  async getOrders(userID: string) {
    return await this.userRepository.getOrders(userID);
  }
}
