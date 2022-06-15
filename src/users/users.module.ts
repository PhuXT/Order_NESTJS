import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserRepository } from './user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { PassportModule } from '@nestjs/passport';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { OrdersModule } from 'src/orders/orders.module';
import { Order, OrderSchema } from 'src/orders/order.schema';

// import { LocalStrategy } from 'src/auth/local.strategy';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    PassportModule,
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UserRepository,
    LocalAuthGuard,
    AuthService,
    JwtService,
  ],
  exports: [UsersService, UserRepository],
})
export class UsersModule {}
