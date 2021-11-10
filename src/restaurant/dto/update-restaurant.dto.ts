import { PartialType } from "@nestjs/mapped-types";
import { createRestaurantDto} from './create-restaurant.dto'

export class UpdateRestaurantDto extends PartialType(createRestaurantDto){}