import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class CreateUserDto{
  @ApiProperty({
    type:String,
    description: ' Name of user',
    default: '',
  }) 
 @IsString ()
 @IsNotEmpty()
  readonly name: string;
  @ApiProperty({
    type:String,
    description: 'the email of user',
    default: '',
  }) 
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
  @ApiProperty({
    type:String,
    description: 'Password',
    default: '',
  }) 
  @IsNotEmpty()
  readonly password:string;
  readonly role:string;

}