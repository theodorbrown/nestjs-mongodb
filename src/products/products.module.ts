import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { MongooseModule } from "@nestjs/mongoose";
import { Product, ProductSchema } from "./schemas/products.schema";
import { ProductsController } from './products.controller';
import * as plugin from './mongoose-plugins/index';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Product.name,
        useFactory: () => {
          const schema = ProductSchema;
          schema.plugin(plugin.preRemoveHook);
          schema.plugin(plugin.preSaveHook);
          return schema;
        }
      }
    ])
  ],
  exports : [
    MongooseModule
  ],
  providers: [ProductsService],
  controllers: [ProductsController]
})
export class ProductsModule {}
