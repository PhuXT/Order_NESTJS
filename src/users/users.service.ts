import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { UserCreateDto } from './dto/UserCreate.dto';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}
  // LOGIN
  async login(email: string, pass: string): Promise<unknown> {
    const user = await this.userRepository.logIn(email, pass);
    const { password, ...inforUser } = user['_doc'];
    return user['_doc'];
  }
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
    const { _id, email } = newUser['_doc'];
    const payload = { id: _id, email };
    return newUser;
  }
}
