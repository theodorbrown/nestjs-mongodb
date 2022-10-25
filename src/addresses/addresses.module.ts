import { Module } from '@nestjs/common';
import { AddressesController } from './addresses.controller';
import { AddressesService } from './addresses.service';
import { Address, AddressSchema } from "./schemas/address.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../users/schemas/user.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Address.name, schema: AddressSchema },
      { name: User.name, schema: UserSchema }
    ])
  ],
  controllers: [AddressesController],
  providers: [AddressesService]
})
export class AddressesModule {
}
