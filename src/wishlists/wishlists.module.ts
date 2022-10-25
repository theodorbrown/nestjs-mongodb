import { Module } from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { MongooseModule } from "@nestjs/mongoose";
import { Wishlist, WishlistSchema } from "./schemas/wishlists.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Wishlist.name, schema: WishlistSchema }])
  ],
  exports : [
    MongooseModule
  ],
  providers: [WishlistsService]
})
export class WishlistsModule {}
