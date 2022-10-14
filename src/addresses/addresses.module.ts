import { Module } from '@nestjs/common';
import { AddressesController } from './addresses.controller';
import { AddressesService } from './addresses.service';
import { Address, AddressSchema } from "./schemas/address.schema";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Address.name, schema: AddressSchema }])
  ],
  controllers: [AddressesController],
  providers: [AddressesService]
})
export class AddressesModule {
}
