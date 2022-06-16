import { OrderSchema, OrderDocument, Order } from './order.schema';
import { UserSchema, UserDocument, User } from 'src/users/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { OrderCreateDto } from './dto/createOrder.dto';
import { Model } from 'mongoose';
import { OrderStatus } from './orders.enum';
@Injectable()
export class OrderRepository {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}
  // CREATE
  async create(userID: string, orderCreateDto: OrderCreateDto) {
    const user = await this.userModel.findOne({ _id: userID });
    if (!user) throw new ForbiddenException('User not found');

    const newOrderObj = { ...orderCreateDto, userOrderID: userID };
    const newOrder = new this.orderModel(newOrderObj);

    // Save order id to userTable
    const orderID = newOrder._id.toString();
    // const orderID = newOrder._id;
    await this.userModel.updateOne(
      { _id: userID },
      { $push: { orderIDS: orderID } },
    );
    return newOrder.save();
  }

  // UPDATE STATUS
  async update(userID: string, orderID: string, orderStatus: OrderStatus) {
    const user = await this.userModel.findOne({ _id: userID });
    if (!user.orderIDS.includes(orderID)) {
      throw new ForbiddenException('You can only cancel your orders');
    }
    const order = await this.orderModel.findOne({ _id: orderID });
    const createdAt = Date.parse(order.createdAt);
    if (createdAt + 30000 < Date.now()) {
      throw new ForbiddenException('Order is being processed.');
    }
    return await this.orderModel.findByIdAndUpdate(
      { _id: orderID },
      { $set: { orderStatus: orderStatus } },
      { new: true },
    );
  }

  // get ORDER
  async getOrder(userID: string, orderID: string): Promise<Order> {
    const user = await this.userModel.findOne({ _id: userID });
    if (!user.orderIDS.includes(orderID)) {
      throw new ForbiddenException('You can only get your orders');
    }
    const order = await this.orderModel.findOne({ _id: orderID });
    return order;
  }
}
