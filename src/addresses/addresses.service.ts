import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Address, AddressDocument } from "./schemas/address.schema";
import { CreateAddressDto } from "./dto/create-address.dto";
import { HelpersService } from "../helpers/helpers.service";
import { User, UserDocument } from "../users/schemas/user.schema";

@Injectable()
export class AddressesService {
  constructor(
    @InjectModel(Address.name) private addressModel: Model<AddressDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private helpersService: HelpersService
  ) {
  }

  async create(createAddressDto: CreateAddressDto, userId: string): Promise<Address> {
    const address = await this.addressModel.create({ ...createAddressDto, userId });
    await this.userModel.updateOne({ _id: userId }, {
      $push:
        {
          addresses: address.id
        }
    });
    return address;
  }

  async findAll(): Promise<Address[]> {
    return this.addressModel.find().exec();
    //[] if none
  }

  async findByUser(usrId: string): Promise<Address[]> {
    this.helpersService.checkObjectId(usrId);
    return this.addressModel.find({ userId: usrId }).exec();
    //[] if none
  }

  async findOne(id: string): Promise<Address> {
    this.helpersService.checkObjectId(id);
    const address = await this.addressModel.findOne({ _id: id }).exec();
    if (!address)
      throw new NotFoundException(`Operation canceled.`, "Address not found.");
    return address;
  }


  async deleteOne(id: string) {
    this.helpersService.checkObjectId(id);
    //1. Delete address in address collection
    const address = await this.addressModel.findByIdAndRemove({ _id: id }).exec();
    //2. Delete address ObjectId in array addresses of user collection
    if (address) {
      const userId = address.userId;
      await this.userModel.updateOne({ _id: userId }, {
        $pull: {
          addresses: id
        }
      });
      return address;
    }
    throw new NotFoundException(`Operation canceled.`, "Address not found.");
  }
}
