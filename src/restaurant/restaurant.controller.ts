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
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { query } from 'express';
import { hasRoles } from 'src/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/auth/gurdes/jwt-guard';
import { RolesGuard } from 'src/auth/gurdes/roles.guard';
import { CreateRestaurantDto } from './dto/Create-Restaurant.Dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { RestaurantService } from './restaurant.service';
import { QueryRestaurantDto } from './dto/Query-Restaurant.dto';
import{PaginationQueryDto }from './dto/Pagination-Query.dto'
import { type } from 'os';
import {Request} from "express";
@ApiTags('restaurants')
@Controller('restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) { }

  @hasRoles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('JWT-auth')
  @Post()
  async addRestaurant(@Body() createrestdto: CreateRestaurantDto) {
    const generateId = await this.restaurantService.insertRestaurant(
      createrestdto);
    return { id: generateId };
  }
  /*
      @hasRoles('user','admin')
      @UseGuards(JwtAuthGuard, RolesGuard)
      @ApiBearerAuth('JWT-auth')
    @Get()
  //@ApiForbiddenResponse({ description: 'Forbidden' })
    async getRestaurant() {
        const restaurants = await this.restaurantService.getallRestaurants();
      return restaurants;
      }
      @hasRoles('user','admin')
      @UseGuards(JwtAuthGuard, RolesGuard)
      @ApiBearerAuth('JWT-auth')
      @Get(':name')
      //@ApiForbiddenResponse({ description: 'Forbidden' })
    async searchRestaurant(@Param('name') name: string) {
          const restaurants = await this.restaurantService.searchByName(name);
        return restaurants;
        }
  
        @hasRoles('user','admin')
        @UseGuards(JwtAuthGuard, RolesGuard)
         @ApiBearerAuth('JWT-auth')
         @Get(':latlng')
    async nearestrestaurants(@Param('latlng') latlng: string) {
            const restaurants = await this.restaurantService.nearestRestaurant(latlng);
          return restaurants;
          }
  */
  //@hasRoles('user', 'admin')
  //@UseGuards(JwtAuthGuard, RolesGuard)
  //@ApiBearerAuth('JWT-auth')
  @Get('/groupbycity')
  // @ApiOkResponse({ description: 'the restaurnt list' })
  //@ApiForbiddenResponse({ description: 'Forbidden' })
  async groupRestByCity() {
    const restaurants = await this.restaurantService.groupBycity();
    return restaurants;
  }
/*
  @hasRoles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get admin section' })
  @ApiBearerAuth('JWT-auth')*/
  @Patch(':id')
  @ApiOkResponse({ description: 'the restaurnt is successfully updated' })
  //@ApiForbiddenResponse({ description: 'Forbidden' })
  update(
    @Param('id') id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ) {
    return this.restaurantService.update(id, updateRestaurantDto);
  }
  @hasRoles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('JWT-auth')
  @Delete(':id')
  @ApiOkResponse({ description: 'the restaurnt is successfully deleted' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  remove(@Param('id') id: string) {
    return this.restaurantService.remove(id);
  }


  @ApiQuery({ name: 'name', required: false, explode: false })
  @ApiQuery({ name: 'latlng', required: false })
  @ApiQuery({ name: 'Page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @Get()
  async getallRestaurant(
    @Query() queryRestaurantDto: QueryRestaurantDto,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    // console.log(queryRestaurantDto.latlng)
   
  return  this.restaurantService.getRestaurants(
      queryRestaurantDto,
      paginationQuery,
    );

    
  };
  }
  /*
  @Get('pagination')
  async getallrest() {
    return this.restaurantService.findAllresta({ take: 10, skip: 0 });
  }
*/

