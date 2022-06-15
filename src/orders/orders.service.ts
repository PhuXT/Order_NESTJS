import { Injectable } from '@nestjs/common';
import { OrderCreateDto } from './dto/createOrder.dto';
import { OrderStatus } from './orders.enum';
import { OrderRepository } from './orders.repository';
@Injectable()
export class OrdersService {
  constructor(private orderRepository: OrderRepository) {}

  // CREATE ORDER
  async create(userID, orderCreateDto: OrderCreateDto) {
    // Total price
    const totalPrice = orderCreateDto.products.reduce((pre, curr) => {
      return pre + curr.quantity * curr.productPrice;
    }, 0);
    orderCreateDto.totalPrice = totalPrice;
    return await this.orderRepository.create(userID, orderCreateDto);
  }

  // CANCEL ORDER
  async cancelOrder(userID: string, orderID: string) {
    return await this.orderRepository.update(userID, orderID);
  }
}
