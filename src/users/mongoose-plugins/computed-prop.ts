// Create a virtual property `isLocked` cast to boolean
import { UserSchema } from "../schemas/user.schema";

module.exports = function computedPropIsLocked() {
  UserSchema.virtual("isLocked").get(function() {
    return !!(this.lockUntil && this.lockUntil > Date.now());
  });
};
