import { UserSchema } from "../schemas/user.schema";

export function getAuthenticated() {
  // Static func for auth user coming from Mongo doc
  //Static doesn't depend on user instance
  UserSchema.static("getAuthenticated", async function(email, password) {
    const user = await this.findOne({ email: email });
    // make sure the user exists
    if (!user) {
      return null;
    }
    // check if the account is currently locked
    if (user.isLocked) {
      // increment login attempts if account lock isn't finished or reset
      user.incLoginAttempts();
      return {
        lockUntilInfo: user.lockUntil,
        loginAttemptsInfo: user.loginAttempts
      }
      //il ressort sans lock ou avec un lock : le lockuntil
    }

    // test for a matching password
    const isMatch = await user.comparePassword(password);
    if (isMatch) {
      if (!user.isLocked) {
        await user.updateOne({
          $set: { loginAttempts: 0 },
          $unset: { lockUntil: 1 }
        });
        return user;
      }
    } else if (!user.isLocked) {
      user.incLoginAttempts();
      return null;
    }
  });
};
