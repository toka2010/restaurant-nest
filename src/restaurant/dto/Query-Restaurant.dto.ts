
import { IsEmail, IsLatLong, isLatLong, IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';
export class QueryRestaurantDto {

   @IsOptional()
    readonly name: string;
    @IsOptional()
    readonly latlng: string;

}