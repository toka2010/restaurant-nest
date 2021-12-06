import { HttpException, Injectable ,NotFoundException } from '@nestjs/common';
import { InjectModel,InjectConnection } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { City } from './city.model';
import { CreateCityDto } from './dto/Create-City.Dto';


@Injectable()
export class CityService {
    private cities: City[] = [];
  constructor(@InjectModel('City') private readonly cityModel: Model<City>) {}


  async insertCity(createcity:CreateCityDto) {
    try{
    const newCity = new this.cityModel(createcity);
    const result = await newCity.save();
    //console.log('🚀 ~ result', result);
    return result;
  }
    catch(err){
      throw new HttpException(err.message, 400);
    }
    
  }
  async getAllCities(){
    const getcities=  await this.cityModel.find().exec();
    console.log('🚀result', getcities);
    
    return getcities;
    }}
