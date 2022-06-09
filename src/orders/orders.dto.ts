import { IsNotEmpty } from 'class-validator';
import { OrderStatus } from './orders.enum';

type item = {
  productID: string;
  quantity: number;
};
export class OrderCreateDto {
  id: string;
  @IsNotEmpty()
  userOrderID: string;
  @IsNotEmpty()
  products: item[];
  @IsNotEmpty()
  address: string;
  @IsNotEmpty()
  phone: string;
  orderStatus: OrderStatus;
  totalPrice: number;
}
