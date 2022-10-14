import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards } from "@nestjs/common";
import { CreateAddressDto } from "./dto/create-address.dto";
import { AddressesService } from "./addresses.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";

@Controller("addresses")
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createAddressDto: CreateAddressDto, @Request() req) {
    const userId = req.user._id;
    return this.addressesService.create(createAddressDto, userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get("all_for_admin")
  async findAll() {
    return this.addressesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findByUser(@Request() req) {
    const userId = req.user._id;
    return this.addressesService.findByUser(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.addressesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.addressesService.deleteOne(id);
  }
}
