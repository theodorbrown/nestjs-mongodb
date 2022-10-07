import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import { Idea, IdeaDocument } from "./schemas/idea.schema";
import { Connection, Model } from "mongoose";
import { CreateIdeaDto } from "./dto/create-idea.dto";

@Injectable()
export class IdeasService {
  constructor(
    @InjectModel(Idea.name) private ideaModel: Model<IdeaDocument>,
    @InjectConnection() private connection: Connection
  ) {}

  async create(createIdeaDto: CreateIdeaDto): Promise<Idea> {
    const createdIdea = await this.ideaModel.create(createIdeaDto);
    return createdIdea;
  }

  async findAll(): Promise<Idea[]> {
    return this.ideaModel.find().exec();
  }

  async findOne(id: string): Promise<Idea> {
    return this.ideaModel.findOne({ _id: id }).exec();
  }

  async delete(id: string) {
    const deletedIdea = await this.ideaModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedIdea;
  }

}
