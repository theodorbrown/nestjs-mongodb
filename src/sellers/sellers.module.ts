import { Module } from '@nestjs/common';
import { SellersService } from './sellers.service';
import { MongooseModule } from "@nestjs/mongoose";
import { Seller, SellerSchema } from "./schemas/sellers.schema";
import { SellersController } from './sellers.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Seller.name, schema: SellerSchema }])
  ],
  exports : [
    MongooseModule
  ],
  providers: [SellersService],
  controllers: [SellersController]
})
export class SellersModule {}
