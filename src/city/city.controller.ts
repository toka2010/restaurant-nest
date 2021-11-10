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
import { CityService } from './city.service';
import { createCityDto } from './dto/create-city.dto';

@Controller('city')
export class CityController {

    constructor(private readonly cityService: CityService) {}
    @HttpCode(201)
    @Post()
  async addCity(@Body() createdto: createCityDto) {
    const generateId = await this.cityService.insertCity(createdto);
      return  generateId ;}

    @Get()
    async getCities(){
      const cities = await this.cityService.getAllCities();
    return cities;
    }

}
