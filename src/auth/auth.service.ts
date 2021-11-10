import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { from, Observable, of } from 'rxjs';
import { User } from 'src/user/user.model';
const bcrypt=require('bcrypt');

@Injectable()
export class AuthService {
  constructor(private readonly jwtservice: JwtService) {}
  generateJwt(user: User) {
    return  this.jwtservice.sign({ user });
  }
  hashPassword(password :string) {
    return bcrypt.hash(password, 12);
  }
  comparePasswords(
    newpassword: string,
    passwordHash: string,
  ){
    return (bcrypt.compare(newpassword, passwordHash));
  }
}
