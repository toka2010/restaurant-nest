import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.model';
import { UserService } from '../user/user.service';

const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtservice: JwtService,
    @Inject(forwardRef(() => UserService))
    private userServise: UserService


  ) { }
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userServise.findOneByName(username);
    //console.log("🚀 ~ file: auth.service.ts ~ line 20 ~ AuthService ~ validateUser ~ user", user)
    const result = await this.comparePasswords(pass, user.password);

    if (user && result) {

      return user;
    }
    return null;
  }

  generateJwt(user: User) {
    return this.jwtservice.sign({ user });
  }
  hashPassword(password: string) {
    return bcrypt.hash(password, 12);
  }
  comparePasswords(
    newpassword: string,
    passwordHash: string,
  ) {
    return (bcrypt.compare(newpassword, passwordHash));
  }
}
