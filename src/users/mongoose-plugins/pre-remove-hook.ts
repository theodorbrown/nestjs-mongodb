import { UserSchema } from "../schemas/user.schema";
import { unlink } from "node:fs/promises";
import { Address } from "../../addresses/schemas/address.schema";
import { Wishlist } from "../../wishlists/schemas/wishlists.schema";

export function preRemove() {
  UserSchema.pre("remove", async function() {
    //addresses
    await this.$model(Address.name).deleteMany({
      _id: {
        $in: this.addresses
      }
    });

    //wishlists
    await this.$model(Wishlist.name).deleteOne({
      _id: this.wishListId
    });

    //ratings
    /** Not deleting ratings --> will show User deleted when display ratings*/

    //seller
    /** Treated before hook*/ //--> in seller service or hook : on delete : remove products in products (with productsids)
    //images
    if (this.profileImage !== process.env.USER_DEFAULT_IMG)
      await unlink(process.env.IMAGES_PATH + this.profileImage);
  });
}
