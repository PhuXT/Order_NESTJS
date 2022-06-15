import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class PayLoadDto {
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  userId: string;
}
