import { Body, Controller, Post } from "@nestjs/common";
import { CreateAddressDto } from "./dto/create-address.dto";
import { AddressesService } from "./addresses.service";

@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {
  }

  @Post()
  create(@Body() createAddressDto: CreateAddressDto){
    return this.addressesService.create(createAddressDto);
  }


}
