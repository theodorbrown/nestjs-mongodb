import mongoose, { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Product } from "../../products/schemas/products.schema";
import { User } from "../../users/schemas/user.schema";

export type WishlistDocument = Wishlist & Document

@Schema({ timestamps: true })
export class Wishlist {

  @Prop({ required: true, default: "My wishlist" })
  name: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }], required: true, default: null })
  productsIds: Product[];

  /*@Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true })
  userId: User;*/

}

export const WishlistSchema = SchemaFactory.createForClass(Wishlist);
