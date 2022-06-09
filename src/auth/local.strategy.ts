import { PassportStrategy } from '@nestjs/passport';

// interface
import { Strategy } from 'passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      usernameField: 'email',
    });
  }
  //   Logic xác thực nằm ở đây
  //   Thông tin xác thực sẽ được tự động thêm vào request
  async validate(email: string, password: string) {
    const user = await this.userService.login(email, password);
    if (!user) throw new UnauthorizedException('Login failed!');
    return user;
  }
}
