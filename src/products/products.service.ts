import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Product, ProductDocument } from "./schemas/products.schema";
import { Model } from "mongoose";

@Injectable()
export class ProductsService {

  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {
  }

  async create(createProductDto) {
    await this.productModel.create(createProductDto);
  }
}
