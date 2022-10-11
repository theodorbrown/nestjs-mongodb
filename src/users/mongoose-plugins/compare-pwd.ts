// Compare pwd func
import * as bcrypt from "bcryptjs";
import { UserSchema } from "../schemas/user.schema";

export function comparePassword() {
  UserSchema.method('comparePassword', function comparePassword(plainPwd) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(plainPwd, this.password, function(err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  });
}

