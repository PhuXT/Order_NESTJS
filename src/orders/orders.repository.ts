import { OrderSchema, OrderDocument, Order } from './order.schema';
import { UserSchema, UserDocument, User } from 'src/users/user.schema';
import {
  Product,
  ProductSchema,
  ProductDocument,
} from 'src/products/product.schema';
import { InjectModel } from '@nestjs/mongoose';
import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { OrderCreateDto } from './orders.dto';
import { Model } from 'mongoose';
import { OrderStatus } from './orders.enum';
@Injectable()
export class OrderRepository {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}
  async create(orderCreateDto: OrderCreateDto): Promise<Order> {
    const userID = orderCreateDto.userOrderID;
    // Check user order exist
    const user = await this.userModel.findOne({ _id: userID });
    if (!user) throw new NotFoundException('User not found');

    // Check product exist and quantity erro and return total
    const listProductOrders = orderCreateDto.products;
    let totalPrice = 0;
    listProductOrders.forEach(async (item) => {
      const product = await this.productModel.findOne({ _id: item.productID });
      if (!product) {
        throw new NotFoundException(`Product ID ${item.productID} not found`);
      }
      if (product.quantity < item.quantity) {
        throw new BadRequestException('Quantity is not enough');
      }
      // Total Price
      totalPrice += product.price * item.quantity;
    });

    // add order
    orderCreateDto.totalPrice = totalPrice;
    orderCreateDto.orderStatus = OrderStatus.CREATED;
    const newOrder = new this.orderModel(orderCreateDto);
    return newOrder.save();
  }
}
