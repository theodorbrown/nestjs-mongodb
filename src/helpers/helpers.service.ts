import { Injectable, NotFoundException } from "@nestjs/common";
import mongoose from "mongoose";

@Injectable()
export class HelpersService {
  //helper
  checkObjectId(id: string) {
    if (!mongoose.isValidObjectId(id))
      throw new NotFoundException("Provide a valid ObjectId.", "Invalid ObjectId.");
  }

}
