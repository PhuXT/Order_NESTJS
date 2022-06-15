import { InjectModel } from '@nestjs/mongoose';
import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { UserCreateDto } from './dto/UserCreate.dto';
import * as bcrypt from 'bcrypt';
import { Order, OrderDocument } from 'src/orders/order.schema';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}

  // find
  async find(email: string): Promise<User> {
    return await this.userModel.findOne({ email });
  }
  // CREATE USER
  async create(userCreateDto: UserCreateDto): Promise<User> {
    const user = await this.userModel.findOne({ email: userCreateDto.email });
    if (user) throw new BadRequestException('Email exist');
    const newUser = new this.userModel(userCreateDto);
    return await newUser.save();
  }

  // GET ORDERS
  async getOrders(userID: string): Promise<any> {
    const user = await this.userModel.findOne({ _id: userID });
    if (!user) throw new ForbiddenException('User Not Found');
    const OrderIDS = user.orderIDS;
    const orders = await this.orderModel.find({ _id: { $in: OrderIDS } });
    return orders;
  }
}
