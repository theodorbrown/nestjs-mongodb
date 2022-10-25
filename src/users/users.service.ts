import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import { Connection, Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { unlink } from "node:fs/promises";
import * as dotenv from "dotenv";
import { HelpersService } from "../helpers/helpers.service";
import { Address, AddressDocument } from "../addresses/schemas/address.schema";

dotenv.config();

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Address.name) private addressModel: Model<AddressDocument>,
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
    //1. Find user
    const user = await this.findOne({ _id: id });
    //2. Delete all his addresses in addresses collection
    await this.addressModel.deleteMany({ userId: id });
    //3. Delete profile pic if he has one
    if (user.profileImage !== process.env.USER_DEFAULT_IMG)
      await unlink(process.env.IMAGES_PATH + user.profileImage);
    //4. Delete user
    //@ts-ignore
    return await user.deleteOne().exec();
  }

  //helper
  async userExist(email: string): Promise<boolean> {
    const userExist = await this.userModel.findOne({ email: email });
    return !!userExist;
  }
}
