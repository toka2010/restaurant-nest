import {
    Body,
    Controller,
    Query,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    Res,
    Delete,
  } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CityService } from './city.service';
import { CreateCityDto } from './dto/Create-City.Dto';
@ApiTags('cities')
@Controller('cities')
export class CityController {

    constructor(private readonly cityService: CityService) {}
    @HttpCode(201)
    @Post()
  async addCity(@Body() createdto: CreateCityDto) {
    const generateId = await this.cityService.insertCity(createdto);
      return  generateId ;}

    @Get()
    async getCities(){
      const cities = await this.cityService.getAllCities();
    return cities;
    }

}
