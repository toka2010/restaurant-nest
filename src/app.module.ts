import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantModule } from './restaurant/restaurant.module';
import { CityModule } from './city/city.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    RestaurantModule,
    CityModule,
    MongooseModule.forRoot(
      'mongodb+srv://toqa:MS8Mnaqf2alNAPSt@cluster0.hlmg7.mongodb.net/restbb?retryWrites=true&w=majority',
    ),
    UserModule,
    AuthModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
