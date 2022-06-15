import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { OrderStatus } from '../orders.enum';

type item = {
  productID: string;
  productName: string;
  productPrice: number;
  quantity: number;
};
export class OrderCreateDto {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  // @IsNotEmpty()
  // userOrderID: string;
  @IsNotEmpty()
  products: item[];
  @IsNotEmpty()
  address: string;
  @IsNotEmpty()
  phone: string;
  // orderStatus: OrderStatus;
  totalPrice: number;
}
