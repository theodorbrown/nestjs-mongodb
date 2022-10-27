import { Module } from "@nestjs/common";
import { AddressesController } from "./addresses.controller";
import { AddressesService } from "./addresses.service";
import { Address, AddressSchema } from "./schemas/address.schema";
import { MongooseModule } from "@nestjs/mongoose";
import * as plugin from "./mongoose-plugins/index";

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Address.name,
        useFactory: () => {
          const schema = AddressSchema;
          schema.plugin(plugin.PreSaveHook);
          schema.plugin(plugin.PreRemoveHook);
          return schema;
        }

      }
    ])
  ],
  controllers: [AddressesController],
  providers: [AddressesService]
})
export class AddressesModule {
}
