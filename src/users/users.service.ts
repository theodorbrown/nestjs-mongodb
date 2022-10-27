import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import { Connection, Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import * as dotenv from "dotenv";
import { HelpersService } from "../helpers/helpers.service";

dotenv.config();

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectConnection() private connection: Connection,
    private helpersService: HelpersService
  ) {
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userExist = await this.userModel.findOne({ email: createUserDto.email }).exec();
    if (!userExist) {
      return this.userModel.create(createUserDto);
    }
    throw new ConflictException("Operation not allowed.", "Email already exists.");
  }

  async updateOne(filter: any, field: any) {
    await this.userModel.updateOne(filter, field).exec();
  }

  async updateMany(filter: any, field: any) {
    await this.userModel.updateMany(filter, field).exec();
  }

  async findOne(filter: any): Promise<User> {
    const user = await this.userModel.findOne(filter).exec();
    if (user)
      return user;
    throw new NotFoundException("Operation canceled.", "User not found.");
  }

  async findMany(filter: any): Promise<User[]> {
    const users = await this.userModel.find(filter).exec();
    if (users)
      return users;
    throw new NotFoundException("Operation canceled.", "Users not found.");
  }


  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async delete(id: string) {
    this.helpersService.checkObjectId(id);
    const user = await this.userModel.findById(id);
    if(user.sellerId)
      throw new NotFoundException("Operation canceled.", "User is a seller.");

    if(user)
      return user.remove();
    throw new NotFoundException("Operation canceled.", "User to delete not found.");
  }

  //helper
  async userExist(email: string): Promise<boolean> {
    const userExist = await this.userModel.findOne({ email: email });
    return !!userExist;
  }
}
