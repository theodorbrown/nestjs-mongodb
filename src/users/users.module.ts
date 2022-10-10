import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schemas/user.schema";

@Module({
  //MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          schema.plugin(require("./mongoose-plugins/transform-returned-obj"));
          schema.plugin(require("./mongoose-plugins/computed-prop"));
          schema.plugin(require("./mongoose-plugins/pre-save-hook"));
          schema.plugin(require("./mongoose-plugins/compare-pwd"));
          schema.plugin(require("./mongoose-plugins/inc-login-attemps"));
          schema.plugin(require("./mongoose-plugins/auth-user"));
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
