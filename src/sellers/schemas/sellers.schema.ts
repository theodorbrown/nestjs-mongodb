import mongoose, { Document, Types } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Product } from "../../products/schemas/products.schema";
import { User } from "../../users/schemas/user.schema";

export type SellerDocument = Seller & Document

@Schema({ timestamps: true })
export class Seller {

  @Prop({ required: true, unique: true, type: mongoose.Schema.Types.ObjectId, ref:'User' })
  userId: User;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true , default: ['all']})
  categories: string[];

  @Prop({ type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}], required: true, default: null})
  products: Product[];//productsIds

}

export const SellerSchema = SchemaFactory.createForClass(Seller);
