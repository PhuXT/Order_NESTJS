import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserLoginDto } from './dto/userLogin.dto';
import { UserCreateDto } from './dto/UserCreate.dto';
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post('/login')
  async login(@Body() userLogin: UserLoginDto): Promise<unknown> {
    const userInfor = await this.userService.login(
      userLogin.email,
      userLogin.password,
    );
    return userInfor;
  }
  @Post('/register')
  async register(@Body() userCreateDto: UserCreateDto) {
    const newUser = await this.userService.create(userCreateDto);
    return newUser;
  }
}
