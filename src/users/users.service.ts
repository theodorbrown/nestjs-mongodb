import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import { Connection, Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";


@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectConnection() private connection: Connection
  ) {
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userModel.create(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email: email }).exec();
  }

  async findOneById(id: string): Promise<User> {
    return this.userModel.findOne({ _id: id }).exec();
  }

  async delete(id: string) {
    const deletedUser = await this.userModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedUser;
  }
}
