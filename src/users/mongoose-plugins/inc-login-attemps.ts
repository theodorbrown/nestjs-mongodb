// Increment login attemps on props
import { UserSchema } from "../schemas/user.schema";

const MAX_LOGIN_ATTEMPTS: number = 5;
const LOCK_TIME: number = 2 * 60 * 60 * 1000;

module.exports = function incLoginAttempts() {
  UserSchema.methods.incLoginAttempts = async function() {
    if (this.lockUntil && this.lockUntil < Date.now()) {
      await this.updateOne({
        $set: {
          //set a 1 au cas ou il valide pas son essai
          loginAttempts: 1
        },
        $unset: {
          lockUntil: 1
        }
      });
    } else {
      await this.updateOne({
        $inc: {
          loginAttempts: 1
        }
      });
    }
    // lock the account if we've reached max attempts and it's not locked already
    if (this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked) {
      await this.updateOne({
        $set: {
          lockUntil: Date.now() + LOCK_TIME
        }
      });
    }
  };
};
