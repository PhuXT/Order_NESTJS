import { IsNotEmpty } from 'class-validator';

export class UserCreateDto {
  @IsNotEmpty()
  readonly name: string;
  @IsNotEmpty()
  readonly email: string;
  @IsNotEmpty()
  password: string;
  readonly phone: string;
  readonly address: string;
  readonly orderIDS: string[];
}
