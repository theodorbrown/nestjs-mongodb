import { UserSchema } from "../schemas/user.schema";

module.exports = function transformReturnedObj() {
  UserSchema.set("toJSON", {
    transform: (doc, ret, opt) => {
      delete ret.password;
      //and confirm is set to undefined in pre save to prevent the path to be added in doc
      return ret;
    }
  });
};
