import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schemas/user.schema";
import * as plugin from "./mongoose-plugins/index";

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          schema.plugin(plugin.getAuthenticated);
          schema.plugin(plugin.transformReturnedObj);
          schema.plugin(plugin.computedPropIsLocked);
          schema.plugin(plugin.preSave);
          schema.plugin(plugin.comparePassword);
          schema.plugin(plugin.incLoginAttempts);
          schema.plugin(plugin.preRemove);
          return schema;
        }
      }
    ])
  ],
  providers: [
    UsersService
  ],
  controllers: [UsersController],
  exports: [
    UsersService,
    MongooseModule
  ]
})

export class UsersModule {
}
