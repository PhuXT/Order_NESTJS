import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { OrderCreateDto } from './dto/createOrder.dto';
import { OrderStatus } from './orders.enum';
import { OrderRepository } from './orders.repository';
@Injectable()
export class OrdersService {
  constructor(
    @Inject('PAYMENT_SERVICE') private client: ClientProxy,
    private orderRepository: OrderRepository,
  ) {}

  // CREATE ORDER
  async create(userID, orderCreateDto: OrderCreateDto) {
    // Total price
    const totalPrice = orderCreateDto.products.reduce((pre, curr) => {
      return pre + curr.quantity * curr.productPrice;
    }, 0);
    orderCreateDto.totalPrice = totalPrice;
    // send to payment
    const order = await this.orderRepository.create(userID, orderCreateDto);
    const payment = { totalPrice: order.totalPrice, token: 123 };
    const paymentStatus = await this.client
      .send('paymentStatus', payment)
      .toPromise();
    // update order status
    await this.orderRepository.update(
      userID,
      order._id.toString(),
      paymentStatus,
    );
    if (paymentStatus === OrderStatus.CONFIRMED) {
      setTimeout(async () => {
        await this.orderRepository.update(
          userID,
          order._id.toString(),
          OrderStatus.DELIVERED,
        );
      }, 20000);
    }
    return order;
  }

  // CANCEL ORDER
  async cancelOrder(userID: string, orderID: string) {
    return await this.orderRepository.update(
      userID,
      orderID,
      OrderStatus.CANCELED,
    );
  }

  //GET ORDER
  async getOrder(userID: string, orderID: string) {
    return await this.orderRepository.getOrder(userID, orderID);
  }
}
