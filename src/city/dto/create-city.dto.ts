import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class CreateCityDto{
 @IsString ()
 @IsNotEmpty()
 @ApiProperty({
  type:String,
  description: 'the Name of city',
  default: '',
}) 
  readonly name: string;


}