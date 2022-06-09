import { Injectable } from '@nestjs/common';
import { OrderRepository } from './orders.repository';
@Injectable()
export class OrdersService {
  constructor(private orderRepository: OrderRepository) {}
  //   async create()
}
