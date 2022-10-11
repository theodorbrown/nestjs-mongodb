import * as bcrypt from "bcryptjs";
import { UserSchema } from "../schemas/user.schema";
import { PreconditionFailedException } from "@nestjs/common";

const SALT_WORK_FACTOR: number = 10;
// Pre save hook
export function preSave() {
  UserSchema.pre("save", function(next) {
    let user = this;
    if (!(user.password === user.confirm)) {
      user.confirm = undefined;
      return next(new PreconditionFailedException("Passwords not matching"));
    }
    // only hash the password if it has been modified (or is new)
    if (!user.isModified("password")) return next();
    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) return next(err);
      // hash the password along with our new salt
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);
        // override the cleartext password with the hashed one
        user.password = hash;
        user.confirm = undefined;
        next();
      });
    });
  });
};
