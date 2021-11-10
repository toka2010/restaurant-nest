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
import { ApiBearerAuth, ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { hasRoles } from 'src/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/auth/gurdes/jwt-guard';
import { RolesGuard } from 'src/auth/gurdes/roles.guard';
  import { createRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { RestaurantService } from './restaurant.service';

@ApiTags('restaurant')
@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @hasRoles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiTags('admin')
  @ApiOperation({ summary: 'Get admin section' })
  @ApiBearerAuth('JWT-auth')
  @Post()
   async addRestaurant(@Body() createrestdto: createRestaurantDto){
      const generateId =  await this.restaurantService.insertRestaurant(createrestdto);
      return { id: generateId };
    }
    @hasRoles('user','admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiTags('admin','user')
    @ApiOperation({ summary: 'Get admin section' })
    @ApiBearerAuth('JWT-auth')
  @Get()
  @ApiOkResponse({ description: 'the restaurnt list' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  async getRestaurant() {
      const restaurants = await this.restaurantService.getRestaurants();
    return restaurants;
    }
    @hasRoles('user','admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiTags('admin','user')
    @ApiOperation({ summary: 'Get admin section' })
    @ApiBearerAuth('JWT-auth')
    @Get('/search/:name')
    @ApiOkResponse({ description: 'the restaurnt list' })
    @ApiForbiddenResponse({ description: 'Forbidden' })
    async searchRestaurant(@Param('name') name:string) {
        const restaurants = await this.restaurantService.searchByName(name);
      return restaurants;
      }
      @hasRoles('user','admin')
      @UseGuards(JwtAuthGuard, RolesGuard)
      @ApiTags('admin','user')
      @ApiOperation({ summary: 'Get admin section' })
      @ApiBearerAuth('JWT-auth')
      @Get('/near/:latlng')
      async nearestrestaurants(@Param('latlng') latlng:string) {
          const restaurants = await this.restaurantService.nearestRestaurant(latlng);
        return restaurants;
        }
        @hasRoles('user','admin')
        @UseGuards(JwtAuthGuard, RolesGuard)
        @ApiTags('admin','user')
        @ApiOperation({ summary: 'Get admin section' })
        @ApiBearerAuth('JWT-auth')
      @Get('/groupbycity')
      @ApiOkResponse({ description: 'the restaurnt list' })
      @ApiForbiddenResponse({ description: 'Forbidden' })
      async groupRestByCity() {
          const restaurants = await this.restaurantService.groupBycity();
        return restaurants;
        }
    @hasRoles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiTags('admin')
  @ApiOperation({ summary: 'Get admin section' })
  @ApiBearerAuth('JWT-auth')
    @Patch(':id')
    @ApiOkResponse({ description: 'the restaurnt is successfully updated' })
    @ApiForbiddenResponse({ description: 'Forbidden' })
    update(@Param('id') id: string, @Body() updateRestaurantDto: UpdateRestaurantDto) {
      return this.restaurantService.update(id, updateRestaurantDto);
    }
    @hasRoles('admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiTags('admin')
    @ApiOperation({ summary: 'Get admin section' })
    @ApiBearerAuth('JWT-auth')
    @Delete(':id')
    @ApiOkResponse({ description: 'the restaurnt is successfully deleted' })
    @ApiForbiddenResponse({ description: 'Forbidden' })
  remove(@Param('id') id: string) {
    return this.restaurantService.remove(id);
  }

}
