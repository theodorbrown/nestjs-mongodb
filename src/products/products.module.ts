import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { MongooseModule } from "@nestjs/mongoose";
import { Product, ProductSchema } from "./schemas/products.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])
  ],
  exports : [
    MongooseModule
  ],
  providers: [ProductsService]
})
export class ProductsModule {}
