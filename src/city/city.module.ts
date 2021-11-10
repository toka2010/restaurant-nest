import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { citySchema } from './city.model';
import { CityController } from './city.controller';
import { CityService } from './city.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'City', schema: citySchema },

])],
  providers: [CityService],
  controllers: [CityController],
})
export class CityModule {}
