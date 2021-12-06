import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsLatLong, isLatLong, IsNotEmpty, IsObject, IsString } from 'class-validator';
export class CreateRestaurantDto{
  @ApiProperty({
    type:String,
    description: 'the name of restaurant',
    default: '',
  }) 
 @IsString ()
 @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    type:String,
    description: 'the email of restaurant',
    default: '',
  }) 
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
  @ApiProperty({
    type:String,
    description: 'the id of city',
    default: '',
  }) 
  @IsNotEmpty()
  readonly city: string;
  @ApiProperty({
    type:[],
    description: 'the loction of restaurant',
    default: '',
  }) 
 
  readonly location: {
    type:{
        type:String,
        default:'Point',
        enum:['Point']
    },coordinates:[Number],
    address:String,
    description:String
};
}