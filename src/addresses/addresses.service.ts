import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model, Types } from "mongoose";
import { Address, AddressDocument } from "./schemas/address.schema";
import { CreateAddressDto } from "./dto/create-address.dto";
import { UsersService } from "../users/users.service";

@Injectable()
export class AddressesService {
  constructor(
    @InjectModel(Address.name) private addressModel: Model<AddressDocument>,
    private usersService: UsersService
  ) {
  }

  async create(createAddressDto: CreateAddressDto): Promise<Address> {
    const address = await this.addressModel.create(createAddressDto);
    const user = await this.usersService.findOne({_id: createAddressDto.userId});
    // @ts-ignore
    await user.updateOne({
      $push:
        {
          addresses: address.id
        }
    });
    //Cela implique :
    //Si user supprimé => supprimer l'adresse par la table addresse tous les user avec cet id
    //Si adresse supprimée => supprimer record dans addresses de user et supprimer dans la table adresse tout avec id address
    return address;
  }

  async findAll(): Promise<Address[]> {
    return this.addressModel.find().exec();
    //[] if none
  }

  async findByUser(usrId: string): Promise<Address[]> {
    this.checkObjectId(usrId);
    return this.addressModel.find({ userId: usrId }).exec();
    //[] if none
    //exc if mongoose can't cast to ObjectId
  }

  async findOne(id: string): Promise<Address> {
    this.checkObjectId(id);
    const address = await this.addressModel.findOne({ _id: id }).exec();
    if (!address)
      throw new NotFoundException(`Address with id ${id} doesn't exist.`, "Address not found.");
    return address;
  }

  async delete(id: string) {
    return this.addressModel
      .findByIdAndRemove({ _id: id })
      .exec();
  }

  //helper
  checkObjectId(id: string) {
    if (!mongoose.isValidObjectId(id))
      throw new NotFoundException("Provide a valid ObjectId.", "Invalid ObjectId.");
  }
}
