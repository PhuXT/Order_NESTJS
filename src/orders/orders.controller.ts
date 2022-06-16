import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Body,
  Patch,
  Param,
  Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { OrderCreateDto } from './dto/createOrder.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  //[POST] API/V1/ORDERS/
  @UseGuards(JwtAuthGuard)
  @Post('')
  async createOrder(@Request() req, @Body() orderCreateDto: OrderCreateDto) {
    const userID = req.user.userId;
    return await this.orderService.create(userID, orderCreateDto);
  }

  //[PATCH] API/V1/ORDERS/:ORDERID/CANCELLATIONS
  @UseGuards(JwtAuthGuard)
  @Patch(':orderID/cancellations')
  async cancelOrder(@Request() req, @Param() params) {
    return await this.orderService.cancelOrder(req.user.userId, params.orderID);
  }

  //[GET] API/V1/ORDERS/:ORDERID
  @UseGuards(JwtAuthGuard)
  @Get(':orderID')
  async getDetailOrder(@Request() req, @Param() params) {
    return await this.orderService.getOrder(req.user.userId, params.orderID);
  }
  // payment
  // @Get()
  // async test() {
  //   const data = await this.client.send('paymentStatus', 'haha');
  //   console.log(await data.toPromise());

  //   return 'haha';
  // }
}
