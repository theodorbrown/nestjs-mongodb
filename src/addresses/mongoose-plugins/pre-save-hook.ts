import { AddressSchema } from "../schemas/address.schema";
import { User } from "../../users/schemas/user.schema";
import { RequestContext } from "nestjs-request-context";

export function PreSaveHook() {
  AddressSchema.pre("save", async function() {
    const req = RequestContext.currentContext.req;
    await this.$model(User.name).updateOne({ _id: req.user.sub }, {
      $push:
        {
          addresses: this._id
        }
    });
  });
}
