import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Date } from 'mongoose';

import { OrderStatus } from './orders.enum';

export type OrderDocument = Order & Document;
type item = {
  productID: string;
  productName: string;
  productPrice: number;
  quantity: number;
};

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true })
  userOrderID: string;

  @Prop({ required: true, default: [] })
  products: item[];

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ default: OrderStatus.CREATED, required: true })
  orderStatus: OrderStatus;

  @Prop({ default: 0 })
  totalPrice: number;

  @Prop()
  createdAt: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
