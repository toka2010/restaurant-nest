import { IsNumber, IsOptional } from "class-validator";

export class PaginationQueryDto {

@IsOptional()
 
 readonly Page: number;

 @IsOptional()

 readonly limit: number;
 
 }