import { HttpException, Injectable ,NotFoundException } from '@nestjs/common';
import { InjectModel,InjectConnection } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { City } from './city.model';
import { createCityDto } from './dto/create-city.dto';


@Injectable()
export class CityService {
    private cities: City[] = [];
  constructor(@InjectModel('City') private readonly CityModel: Model<City>) {}


  async insertCity(createcity:createCityDto) {
    try{
    const newCity = new this.CityModel(createcity);
    const result = await newCity.save();
    //console.log('🚀 ~ result', result);
    return result;
  }
    catch(err){
      throw new HttpException(err.message, 400);
    }
    
  }
  async getAllCities(){
    const getcities=  await this.CityModel.find().exec();
    console.log('🚀result', getcities);
    
    return getcities;
    }}
