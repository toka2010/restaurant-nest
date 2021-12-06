import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class loginUserDto{

  @IsNotEmpty()
  
  readonly name: string;
  @IsNotEmpty()
  readonly password:string;
  

}