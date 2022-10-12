import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { CreateAddressDto } from "./dto/create-address.dto";
import { AddressesService } from "./addresses.service";

@Controller("addresses")
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {
  }

  @Post()
  create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressesService.create(createAddressDto);
  }

  @Get()
  async findAll() {
    return this.addressesService.findAll();
  }

  @Get("user/:usrId")
  async findByUser(@Param("usrId") usrId: string) {
    return this.addressesService.findByUser(usrId);
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.addressesService.findOne(id);
  }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.addressesService.delete(id);
  }
}
