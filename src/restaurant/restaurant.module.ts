import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { restaurantSchema } from './restaurant.model';
import { citySchema} from '../city/city.model';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import { UserService } from 'src/user/user.service';
import {userSchema} from './../user/user.model'
import { UserController } from 'src/user/user.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Restaurant', schema: restaurantSchema },
      { name: 'City', schema: citySchema },
      
    
    ]),
    UserModule,
  ],
  providers: [RestaurantService],
  controllers: [RestaurantController],
})
export class RestaurantModule {}
