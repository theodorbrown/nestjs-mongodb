import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Address, AddressDocument } from "./schemas/address.schema";
import { CreateAddressDto } from "./dto/create-address.dto";
import { HelpersService } from "../helpers/helpers.service";

@Injectable()
export class AddressesService {
  constructor(
    @InjectModel(Address.name) private addressModel: Model<AddressDocument>,
    private helpersService: HelpersService
  ) {
  }

  async create(createAddressDto: CreateAddressDto): Promise<Address> {
    return this.addressModel.create(createAddressDto);
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
    const address = await this.addressModel.findById(id).exec();
    if(address)
      return address.remove();
    throw new NotFoundException("Operation canceled.", "Address to delete not found.");
  }
}
