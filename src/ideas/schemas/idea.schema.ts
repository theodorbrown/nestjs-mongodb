import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from "mongoose";

export type IdeaDocument = Idea & Document;

@Schema({timestamps: true})
export class Idea {

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  inventor: string;

  /*
  @Prop({default: Date.now, required: true})
  createdAt: Date
   */
}

export const IdeaSchema = SchemaFactory.createForClass(Idea);
