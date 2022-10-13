import { ConflictException, Injectable } from "@nestjs/common";
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
    const userExist = await this.findOne({email: createUserDto.email});
    if (!userExist) {
      return this.userModel.create(createUserDto);
    }
    throw new ConflictException("Operation not allowed.", "Email already exists.");
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(filter: any): Promise<User> {
    return this.userModel.findOne(filter).populate("addresses").exec();
  }


  async delete(id: string) {
    return await this.userModel
      .findByIdAndRemove({ _id: id })
      .exec();
  }

  async updateOne(filter: any, field: any){
    await this.userModel.updateOne(filter, field).exec();
  }
}
