import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel,InjectConnection } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Restaurant } from './restaurant.model';
import { createRestaurantDto } from './dto/create-restaurant.dto';
import {UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { City } from '../city/city.model';

@Injectable()
export class RestaurantService {
  private restaurants: Restaurant[] = [];
    constructor(
    @InjectModel('Restaurant')
    private readonly RestaurantModel: Model<Restaurant>,
    @InjectConnection() private readonly connection: Connection,
     @InjectModel('City') private readonly CityModel: Model<City>,
     
    )
    {}
  async insertRestaurant(createrest: createRestaurantDto) {
    
    const checkcity = await this.CityModel.findById({
      _id: createrest.city,
    }).exec();
    if (checkcity) {
      try{
       const newRest = new this.RestaurantModel(createrest);
        const result = await newRest.save();
          return result.id as string;}
          catch(err){
            throw new HttpException(err.message, 400);
          }
    } else {
          throw new NotFoundException(" that city doesn't Exist");
        }
      
      }

  async getRestaurants() {
    const rests = await this.RestaurantModel.find().exec();
        return rests as Restaurant[];
        }
        
async update(id: string, updaterestDto:UpdateRestaurantDto) {
            const exsitingRest = await this.RestaurantModel
              .findOneAndUpdate({ _id: id }, { $set: updaterestDto }, { new: true })
              .exec();
            if (!exsitingRest) {
              throw new NotFoundException(`restaurant id =${id} not found`);
            }
            return exsitingRest;
          }
          async findOne(id: string) {
            const restaurant = await this.RestaurantModel.findById({_id:id}).exec();
            if (!restaurant) {
              throw new NotFoundException(`restaurant id =${id} not found`);
            }
          return restaurant;
          }
          async remove(id: string) {
            const deletedRest = await this.findOne(id);
            return deletedRest.remove();
          }

        async searchByName(item : string){
            const restaurants=await this.RestaurantModel.find().exec();
            const search= restaurants.filter(el => el.name.startsWith(item));
    if (search.length === 0) {
      throw new NotFoundException(`no restauranta start with ${ item}`);
            }
      return search;      
          }
async groupBycity(){
  const stats = await this.RestaurantModel.aggregate([
    {
         "$match": { "to": this.CityModel }
        },
    {
      $group: {
        _id: '$city',
        count : { $sum: 1 },
       restaurants:{
        $push: {name:"$name", location:"$location", email:"$email",city:"$city" }
    }},} ]);
 let temp;
for(let i=0;i<stats.length;i++){
  temp= await this.CityModel.findById(stats[i]._id.toString());
  stats[i]._id=temp.name;
}
return stats;
}

async nearestRestaurant(latlng :string){
  const [lat, lng] = latlng.split(',');
  const nearestRest = await this.RestaurantModel.find(
    {
      location: {
         $nearSphere: {
            $geometry: {
               type : "Point",
               coordinates : [ lat, lng ]
            },
            $minDistance: 0,
            $maxDistance: 500000
        },
      }
    }

 )
 return nearestRest;
}

}
