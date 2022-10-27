import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { SellersService } from "./sellers.service";
import { CreateSellerDto } from "./dto/create-seller.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller('sellers')
export class SellersController {

  constructor(private sellersService: SellersService) {
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createSeller(@Req() req, @Body() createSellerDto: CreateSellerDto){
    const userId = req.user.sub;
    return this.sellersService.createSeller(userId, createSellerDto);
  }
}
