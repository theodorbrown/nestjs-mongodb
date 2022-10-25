import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { HelmetMiddleware } from "@nest-middlewares/helmet";
import * as cors from "cors";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AddressesModule } from './addresses/addresses.module';
import { ImagesModule } from './images/images.module';
import { HelpersModule } from './helpers/helpers.module';
import { ProductsModule } from './products/products.module';
import { WishlistsModule } from './wishlists/wishlists.module';
import { SellersModule } from './sellers/sellers.module';
import { RatingsModule } from './ratings/ratings.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nestjs-db'),
    UsersModule,
    AuthModule,
    AddressesModule,
    ImagesModule,
    HelpersModule,
    ProductsModule,
    WishlistsModule,
    SellersModule,
    RatingsModule,
  ],//imports cannot use providers specified here in this module, they have to provide there one
  controllers: [AppController],//controllers are in same module when written here, so they can use providers
  providers: [AppService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(
      HelmetMiddleware,
      cors({ origin: ["http://localhost:4200", "http://localhost:3000"] })
    ).forRoutes("");
  }
}
