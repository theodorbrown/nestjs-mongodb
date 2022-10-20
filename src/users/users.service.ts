import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import { Connection, Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { unlink } from "node:fs/promises";
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
    const userExist = await this.userModel.findOne({ email: createUserDto.email })
    if (!userExist) {
      return this.userModel.create(createUserDto);
    }
    throw new ConflictException("Operation not allowed.", "Email already exists.");
  }

  async userExist(email: string): Promise<boolean> {
    const userExist = await this.userModel.findOne({ email: email })
    if (!userExist)
      return false;
    return true;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(filter: any) {
    const user = await this.userModel.findOne(filter).populate("addresses").exec();
    if(user)
      return user;
    throw new NotFoundException("Operation canceled.", "User not found.");
  }

  async delete(id: string) {
    this.helpersService.checkObjectId(id);
    //1. Find user
    const user = await this.findOne({ _id: id });
    const addressesArray = user.addresses;
    //2. Delete all his addresses in addresses collection
    for (const address of addressesArray) {
      //@ts-ignore
      await address.deleteOne();
    };
    //3. Delete profile pic if he has one
    if (user.profileImage !== process.env.USER_DEFAULT_IMG)
      await unlink(process.env.IMAGES_PATH + user.profileImage);
    //4. Delete user in user collection
    //@ts-ignore
    return await user.deleteOne();
  }

  async updateOne(filter: any, field: any) {
    await this.userModel.updateOne(filter, field).exec();
  }
}
