import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserLoginDto } from './dto/userLogin.dto';
import { UserCreateDto } from './dto/UserCreate.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  // @Post('/login')
  // async login(@Body() userLogin: UserLoginDto): Promise<unknown> {
  //   const userInfor = await this.userService.login(
  //     userLogin.email,
  //     userLogin.password,
  //   );
  //   return userInfor;
  // }
  // @UseGuards(AuthGuard('local'))
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return req.user;
  }

  @Post('/register')
  async register(@Body() userCreateDto: UserCreateDto) {
    const newUser = await this.userService.create(userCreateDto);
    return newUser;
  }
}
