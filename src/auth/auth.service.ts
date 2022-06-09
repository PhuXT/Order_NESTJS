import { Injectable, ForbiddenException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  jwtService: any;
  constructor(private usersService: UsersService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;
    const isMatch = bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new ForbiddenException('Wrong password');
    }
    const { password, ...result } = user;
    return result;
  }

  async login(user: any) {
    const payload = { email: user.email, id: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
