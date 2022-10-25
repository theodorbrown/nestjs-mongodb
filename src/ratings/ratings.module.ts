import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { Rating, RatingSchema } from "./schemas/ratings.scheama";
import { RatingsService } from './ratings.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Rating.name, schema: RatingSchema }])
  ],
  exports : [
    MongooseModule
  ],
  providers: [RatingsService]
})
export class RatingsModule {}
