import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const dotenv = require('dotenv').config();
//import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private confiService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: confiService.get('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
 // console.log("🚀 ~ file: jwt-strategy.ts ~ line 19 ~ JwtStrategy ~ validate ~ payload", payload)
    
    return { ...payload.user };
  }
}