import { Module } from '@nestjs/common';
import { SellersService } from './sellers.service';
import { MongooseModule } from "@nestjs/mongoose";
import { Seller, SellerSchema } from "./schemas/sellers.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Seller.name, schema: SellerSchema }])
  ],
  exports : [
    MongooseModule
  ],
  providers: [SellersService]
})
export class SellersModule {}
