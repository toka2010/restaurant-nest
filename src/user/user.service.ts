import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { catchError, from, map, Observable, switchMap, throwError } from 'rxjs';
import { loginUserDto } from './dto/login-user.dto';
import { createUserDto } from 'restaurant-nest/src/user/dto/create-user.dto';
import { use } from 'passport';

@Injectable()
export class UserService {
  private users: User[] = [];
  constructor(
    @InjectModel('User')
    private readonly UserModel: Model<User>,
    private authservice: AuthService
  ) { }

  async createUser(createUserDto: CreateUserDto) {

    try {
      const passwordHash = await this.authservice.hashPassword(createUserDto.password);
      const newUser = new this.UserModel(createUserDto);
      newUser.role = 'user';
      newUser.password = passwordHash;
      const result = await newUser.save();
      const token =this.authservice.generateJwt(result);
      return {Data:result,
      token:token
      };
    }
    catch (err) {
      throw new HttpException(err.message, 400);


    }

  }
  /*
  async login(logindto:loginUserDto){
      const email = logindto.email;
      const password = logindto.password;
      const user = await this.validateUser(email, password);
      if (user) {
  //console.log("🚀 user", user)
    
   const token= await this.authservice.generateJwt(user);
   //console.log("🚀  token", token)
   
   return {token : token};
  }
  else{
    throw new NotFoundException(" please enter valid email and Password");
  }
  }
  */
  async validateUser(email: string, password: string) {
    const user = await this.findByemail(email);
    if (user) {
      const old_password = user.password;
      const result = await this.authservice.comparePasswords(password, old_password);
      if (result) {
        return user;
      } else {
        throw new NotFoundException(" please enter correct password");
      }

    }
    throw new NotFoundException(" this email doesn't Exist");
  }
  async findByemail(email: string) {
    const user = await this.UserModel.findOne({ email: email }).exec();
    return user;
  }
  async getUsers() {
    const users = await this.UserModel.find().exec();
    return users as User[];
  }

  async findOne(id: string) {
    const user = await this.UserModel.findById({ _id: id }).exec();
    return user;
  }
  async findOneByName(userName: string): Promise<User | undefined> {
    const user = await this.UserModel.findOne({ name: userName });
    console.log("🚀 ~ file: user.service.ts ~ line 85 ~ UserService ~ findOneByName ~  user", user)


    return this.UserModel.findOne({ name: userName });


  }

  async createDummyAdmin() {
    const dummy = {
      "name": "admin2",
      "email": "admin2@gmail.com",
      "password": "123456",
      "role": "admin"
    }
    dummy.password = await this.authservice.hashPassword(dummy.password);
    const user = await this.UserModel.find({ email: dummy.email }).exec();
    //console.log("🚀 ~ file: user.service.ts ~ line 90 ~ UserService ~ createDummyAdmin ~ user", user)

    if (user.length === 0) {
      const newUser = new this.UserModel(dummy);
      newUser.save();
    }
  }

}
