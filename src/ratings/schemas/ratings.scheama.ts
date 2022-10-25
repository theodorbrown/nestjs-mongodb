import mongoose, { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "../../users/schemas/user.schema";
import { Product } from "../../products/schemas/products.schema";

export type RatingDocument = Rating & Document

@Schema({ timestamps: true })
export class Rating {

  @Prop({ required: true})
  score: number;

  @Prop({ required: true})
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref:'User', required: true})
  authorId: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref:'Product', required: true})
  productId: Product;
}

export const RatingSchema = SchemaFactory.createForClass(Rating);
