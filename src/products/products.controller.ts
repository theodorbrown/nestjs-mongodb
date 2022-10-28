import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CreateProductDto } from "./dto/create-product.dto";

@Controller("products")
export class ProductsController {

  constructor(private productService: ProductsService) {
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }
}
