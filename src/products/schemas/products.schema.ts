import mongoose, { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Seller } from "../../sellers/schemas/sellers.schema";
import { Rating } from "../../ratings/schemas/ratings.scheama";
import { Colors } from "../colors/colors.enum";

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {

  @Prop({ required: true })
  ref: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true, default: "none" })
  brand: string;

  @Prop({ required: true, default: Colors.BLACK })
  colors: Colors[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Seller", required: true, default: "Keane's Shop" })
  sellerId: Seller;//Seller ou Types.ObjectId?

  @Prop({ required: true, default: 1 })
  stock: number;

  @Prop({ required: false })
  picsUrls: string[];

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: "Rating"}], required: true, default: null })
  ratingsIds: Rating[];

}

export const ProductSchema = SchemaFactory.createForClass(Product);
