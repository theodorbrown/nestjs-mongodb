import { Module } from '@nestjs/common';
import { IdeasService } from './ideas.service';
import { IdeasController } from './ideas.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { Idea, IdeaSchema } from "./schemas/idea.schema";

@Module({
  imports:  [MongooseModule.forFeature([{ name: Idea.name, schema: IdeaSchema }])],
  providers: [IdeasService],
  controllers: [IdeasController]
})
export class IdeasModule {}
