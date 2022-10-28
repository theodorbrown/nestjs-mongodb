import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Roles } from "../roles/roles.enum";
import { Address } from "../../addresses/schemas/address.schema";
import * as dotenv from "dotenv";
import { Wishlist } from "../../wishlists/schemas/wishlists.schema";
import { Seller } from "../../sellers/schemas/sellers.schema";
import * as plugin from "../mongoose-plugins/index"

dotenv.config();

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })//select: false
  password: string;

  @Prop({ required: true })
  confirm: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, default: process.env.USER_DEFAULT_IMG })
  profileImage: string;

  @Prop({ required: true })
  age: number;

  //fixing type doesn't change shit best is to fix it in dto
  @Prop({ enum: Roles, default: Roles.USER, required: true })
  role: Roles;

  @Prop({ required: true, default: 0 })
  loginAttempts: number;

  @Prop({ required: false, default: 0 })
  lockUntil: number;

  @Prop({ required: true, default: false })
  isPremium: boolean;

  @Prop({ required: true })
  phone: string;

  //required: true / works because it's array???
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Address' }], required: true, default: null })
  addresses: Address[];

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: "WishList", required: false, default: null })
  wishListId: Wishlist;

  @Prop({ required: false, default: null })
  refreshToken: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Seller", required: false, default: null })
  sellerId: Seller;

  //options are used for validation and throws exception if a prop is missing or email duplicate for example.
  //ExceptionsHandler

}

export const UserSchema = SchemaFactory.createForClass(User);
