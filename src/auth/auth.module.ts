import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { RolesGuard } from './gurdes/roles.guard';
import { JwtAuthGuard } from './gurdes/jwt-guard';
import { JwtStrategy } from './gurdes/jwt-strategy';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
const dotenv = require('dotenv').config();

@Module({
  imports: [
    forwardRef(() =>
      UserModule
    ),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule ],
      inject: [ConfigService],
      useFactory: async (confiService: ConfigService) => ({
        secret: confiService.get('JWT_SECRET'),
        signOptions: { expiresIn: '10000s' },
      }),
    })],
  providers: [AuthService, RolesGuard, JwtAuthGuard, JwtStrategy, ConfigService , LocalStrategy],
  exports: [AuthService, ConfigService],


})
export class AuthModule { }
