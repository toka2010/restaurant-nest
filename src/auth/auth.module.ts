import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { RolesGuard } from './gurdes/roles.guard';
import { JwtAuthGuard } from './gurdes/jwt-guard';
import { JwtStrategy } from './gurdes/jwt-strategy';
import { UserModule } from 'src/user/user.module';
import { RestaurantModule } from 'src/restaurant/restaurant.module';
const dotenv = require('dotenv').config();

@Module({
  imports: [
    forwardRef(() => 
      UserModule
  ),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (confiService: ConfigService) => ({
        secret: confiService.get('JWT_SECRET'),
        signOptions: { expiresIn: '10000s' },
      }),
    })],
    providers:[AuthService , RolesGuard, JwtAuthGuard , JwtStrategy,ConfigService ],
    exports:[AuthService,ConfigService],

    
})
export class AuthModule {}
