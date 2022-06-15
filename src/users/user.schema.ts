import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Order } from 'src/orders/order.schema';
export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  // @Prop({ auto: true })
  // _id: string;
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: '' })
  phone: string;

  @Prop({ default: '' })
  address: string;

  @Prop({
    default: [],
  })
  orderIDS: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
