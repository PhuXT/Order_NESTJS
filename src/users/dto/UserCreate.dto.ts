import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserCreateDto {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  @IsNotEmpty()
  readonly name: string;
  @ApiProperty()
  @IsNotEmpty()
  readonly email: string;
  @ApiProperty()
  @IsNotEmpty()
  password: string;
  @ApiProperty()
  readonly phone: string;
  @ApiProperty()
  readonly address: string;
  @ApiProperty()
  readonly orderIDS: string[];
}
