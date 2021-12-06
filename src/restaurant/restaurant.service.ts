import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Restaurant } from './restaurant.model';
import { CreateRestaurantDto } from './dto/Create-Restaurant.Dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { City } from '../city/city.model';
import { QueryRestaurantDto } from './dto/Query-Restaurant.dto';
import { PaginationQueryDto } from './dto/Pagination-Query.dto';
import { GenericPagination } from './dto/Pagination-dto';
import { RestaurantModule } from 'restaurant-nest/src/restaurant/restaurant.module';
//import { InjectRepository } from '@nestjs/typeorm';
//import { Repository, Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
//import { restaurantSchema } from 'restaurant-nest/src/restaurant/restaurant.model';
//import {paginate,Pagination ,IPaginationOptions} from'nestjs-typeorm-paginate'
//import { FilterOperator, Paginate, PaginateQuery, paginate, Paginated } from 'nestjs-paginate';
//import {  paginate,Pagination,IPaginationOptions,} from 'nestjs-typeorm-paginate';

@Injectable()
export class RestaurantService {
  private restaurants: Restaurant[] = [];
  constructor(
    @InjectModel('Restaurant')
    private readonly restaurantModel: Model<Restaurant>,
    @InjectConnection() private readonly connection: Connection,
    @InjectModel('City') private readonly cityModel: Model<City>,
  ) { }
  async insertRestaurant(createrest: CreateRestaurantDto) {
    const checkcity = await this.cityModel
      .findById({
        _id: createrest.city,
      })
      .exec();
    if (checkcity) {
      try {
        const newRest = new this.restaurantModel(createrest);
        const result = await newRest.save();
        return result.id as string;
      } catch (err) {
        throw new HttpException(err.message, 400);
      }
    } else {
      throw new NotFoundException(" that city doesn't Exist");
    }
  }

  async getallRestaurants() {
    const rests = await this.restaurantModel.find();
    return rests as Restaurant[];
  }

  async update(id: string, updaterestDto: UpdateRestaurantDto) {
    const exsitingRestaurant = await this.restaurantModel.findById(id);
    if (!exsitingRestaurant) {
      throw new NotFoundException(`restaurant id =${id} not found`);
    }
    const updatedRestautant = await this.restaurantModel.updateOne(
      { _id: id },
      { $set:{ updaterestDto} },
      { new: true },
    );

    return updatedRestautant;
  }
  async findOne(id: string) {
    const restaurant = await this.restaurantModel.findById({ _id: id }).exec();
    if (!restaurant) {
      throw new NotFoundException(`restaurant id =${id} not found`);
    }
    return restaurant;
  }
  async remove(id: string) {
    const deletedRest = await this.findOne(id);
    return deletedRest.remove();
  }

  async searchByName(item: string) {
    const regex = new RegExp('^' + item, 'i');
    const search = await this.restaurantModel.find({ name: { $regex: regex } });
    if (search.length === 0) {
      throw new NotFoundException(`no restauranta start with ${item}`);
    }
    return search;
  }

  async groupBycity() {
    const stats = await this.restaurantModel.aggregate([
      {
        $lookup: {
          from: 'cities',
          localField: 'city',
          foreignField: '_id',
          as: 'cityname',
        },
      },
      {
        $set: {
          cityname: { $arrayElemAt: ['$cityname.name', 0] },
        },
      },
      {
        $group: {
          _id: '$cityname',
          count: {
            $sum: 1,
          },
          restaurants: {
            $push: {
              name: '$name',
              location: '$location',
              email: '$email',
              city: '$cityname',
            },
          },
        },
      },
    ]);
    return stats;
  }

  async nearestRestaurant(latlng: string) {
    const [lat, lng] = latlng.split(',');
    const nearestRest = await this.restaurantModel.find({
      location: {
        $nearSphere: {
          $geometry: {
            type: 'Point',
            coordinates: [lat, lng],
          },
          $minDistance: 0,
          $maxDistance: 5000,
        },
      },
    });
    return nearestRest;
  }

  async getRestaurants(queryRestaurantDto: QueryRestaurantDto, options: PaginationQueryDto,): Promise<GenericPagination<RestaurantModule>> {
    const regex = new RegExp('^' + queryRestaurantDto.name, 'i');
    const latlng = queryRestaurantDto.latlng || "";
    const page = options.Page * 1 || 1;
    const limit = options.limit * 1 || 2;
    const [lat, lng] = latlng.split(',');
    let query = {};
    const query_name = { $regex: regex };
    const query_latlong = {
      $nearSphere: {
        $geometry: {
          type: 'Point',
          coordinates: [lat, lng],
        },
        $minDistance: 0,
        $maxDistance: 5000,
      },
    };
    if (queryRestaurantDto.latlng != null && queryRestaurantDto.name != null) {
      query = {
        $and: [{ name: { ...query_latlong } }, { location: { ...query_name } }],
      };
    } else if (queryRestaurantDto.name != null) {
      query['name'] = { ...query_name };
    } else if (queryRestaurantDto.latlng != null) {
      query['location'] = { ...query_latlong };
    }

    console.log(query);
    const restaurantss = await this.restaurantModel
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit);

    const count = await this.restaurantModel.find(query).count();
    const totalPages = Math.ceil(count / limit);
    const pagiationRestaurant = new GenericPagination<RestaurantModule>(
      restaurantss,
      count,
      limit,
      page,
      totalPages);


    return pagiationRestaurant;

  }
  /*
   async findAll(options: PaginationQueryDto) {
     const page = options.Page * 1 || 1;
     const count = await this.restaurantModel.count();
 
     const limit = 4;
 
     const result = await this.restaurantModel
       .find()
       .skip((page - 1) * limit)
       .limit(limit)
       .exec();
 
     return {
       data: result,
       total: count,
       limit: limit,
       pageNumber: page,
       totalPages: Math.ceil(count / limit),
 
     }
   }
 
   async findAll2(options: PaginationQueryDto): Promise<GenericPagination<RestaurantModule>> {
     const page = options.Page * 1 || 1;
     const count = await this.restaurantModel.count();
     const limit = options.limit * 1 || 4;
 
     const restaurants: RestaurantModule = await this.restaurantModel
       .find()
       .skip((page - 1) * limit)
       .limit(limit)
       .exec();
     const totalPages = Math.ceil(count / limit);
     const pagiationRestaurant = new GenericPagination<RestaurantModule>(
       restaurants,
       count,
       limit,
       page,
       totalPages);
     return pagiationRestaurant;
   }
  
   async paginate(options: IPaginationOptions) {
     const result = await paginate<Restaurant>(this.restaurantModel, options);
    return result;
  }
 
 
 
 
 async findAllresta(query) {
     const take =  10;
     const skip = 1;
   
 
     const result = await this.restaurantModel.find({},
       { take: take, skip: skip },
     );
 let total=result.length;
     return {
         data: result,
       count: total,
     }
 }*/
  /*
async paginate(options: IPaginationOptions): Promise<Pagination<Restaurant>> {
  const allRestaurants= await this.restaurantModel.find();
  return paginate<Restaurant>(this.restaurantModel, options);

} 

findAll(query: PaginateQuery): Promise<Paginated<Restaurant>> {
  return paginate(query, this.restaurantModel, {
    sortableColumns: ['id', 'name', 'location'],
    searchableColumns: ['name'],
    defaultSortBy: [['id', 'DESC']],
    filterableColumns: {
      age: [FilterOperator.GTE, FilterOperator.LTE],
    },
  })
}*/


}



