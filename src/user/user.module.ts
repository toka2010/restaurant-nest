import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './user.model';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: userSchema }])
,AuthModule,
],
  providers: [UserService],
  controllers: [UserController],
  exports:[UserService],
})
export class UserModule {}
