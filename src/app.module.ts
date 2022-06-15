import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { OrdersController } from './orders/orders.controller';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL),
    AuthModule,
    OrdersModule,
  ],
  controllers: [AppController, OrdersController],
  providers: [AppService],
})
export class AppModule {}
