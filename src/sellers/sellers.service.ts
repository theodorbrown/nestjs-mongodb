import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Seller, SellerDocument } from "./schemas/sellers.schema";
import { CreateSellerDto } from "./dto/create-seller.dto";

@Injectable()
export class SellersService {

  constructor(
    @InjectModel(Seller.name) private sellerModel: Model<SellerDocument>
  ) {
  }

  async createSeller(userId: string, createSellerDto: CreateSellerDto): Promise<Seller> {
    const seller = await this.sellerModel.find({ userId }).exec();
    if(!seller){
      return await this.sellerModel.create({
        ...createSellerDto,
        userId
      });
    } else {
      throw new ConflictException("Operation not allowed.", "Seller already exist for this user.");
    }
  }
}
