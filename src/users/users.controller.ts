import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserCreateDto } from './dto/UserCreate.dto';
import { UsersService } from './users.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  //[POST] API/V1/USERS/REGISTER
  @Post('/register')
  async register(@Body() userCreateDto: UserCreateDto) {
    const newUser = await this.userService.create(userCreateDto);
    return newUser;
  }

  //[GET] API/V1/USERS/ORDERS
  @UseGuards(JwtAuthGuard)
  @Get('/orders')
  async getOrders(@Request() req) {
    return this.userService.getOrders(req.user.userId);
  }
}
