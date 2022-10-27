import { AddressSchema } from "../schemas/address.schema";
import { RequestContext } from "nestjs-request-context";
import { User } from "../../users/schemas/user.schema";

export function PreRemoveHook() {
  AddressSchema.pre("remove", async function() {
    const req = RequestContext.currentContext.req;
    await this.$model(User.name).updateOne({ _id: req.user.sub }, {
      $pull: {
        addresses: this._id
      }
    });
  });
}
