import { IsNotEmpty } from 'class-validator';

export class UserCreateDto {
  _id: string;
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
