import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Types } from "mongoose";
import { Roles } from "../roles/roles.enum";
import { Address } from "../../addresses/schemas/address.schema";

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })//select: false
  password: string;

  //could be required false because it doesn't appear in doc (but i keep it true for user validation)
  @Prop({ required: true })
  confirm: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  age: number;

  //fixing type doesn't change shit best is to fix it in dto
  @Prop({ enum: Roles, default: Roles.USER, required: true })
  role: string;

  @Prop({ required: true, default: 0 })
  loginAttempts: number;

  @Prop({ required: false, default: 0 })
  lockUntil: number;

  @Prop({ required: true, default: false})
  isPremium: boolean;

  @Prop({required: true})
  phone: string

  @Prop( { type: [mongoose.Schema.Types.ObjectId], ref: 'Address', required: true, default: null})
  addresses: [Types.ObjectId]

  @Prop( { type: mongoose.Schema.Types.ObjectId, ref: 'WishList', required: false, default: null})
  wishList: Types.ObjectId

  //options are used for validation and throws exception if a prop is missing or email duplicate for example.
  //ExceptionsHandler

}

export const UserSchema = SchemaFactory.createForClass(User);

