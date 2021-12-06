import { PartialType } from "@nestjs/mapped-types";
import { CreateRestaurantDto} from './Create-Restaurant.Dto'

export class UpdateRestaurantDto extends PartialType(CreateRestaurantDto){}