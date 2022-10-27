import mongoose, { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "../../users/schemas/user.schema";

export type AddressDocument = Address & Document;

@Schema()
export class Address {
  @Prop({required: true})
  streetNumber: number

  //required is if it has to be in payload
  @Prop({required: false, default:""})
  complement: string

  @Prop({required: true})
  street: string

  @Prop({required: true})
  zipCode: string

  @Prop({required: true})
  city: string

  @Prop({required: true})
  region: string

  @Prop({required: true})
  country: string

 /* @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User*/
}

export const AddressSchema = SchemaFactory.createForClass(Address);
