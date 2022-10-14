import { Injectable, StreamableFile } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { unlink } from "node:fs/promises";
import * as dotenv from "dotenv";
import { createReadStream } from "fs";
import { join } from 'path'

dotenv.config();

@Injectable()
//profileImage prop in db
export class ImagesService {
  constructor(private userService: UsersService) {
  }

  //add or replace
  async uploadFile(userId, fileName) {
    return this.handleFiles(userId, fileName);
  }

  //delete current and replace by default
  async deleteFile(userId) {
    return this.handleFiles(userId, null);
  }


  async getFile(userId): Promise<StreamableFile> {
    let user = await this.userService.findOne({ _id: userId });
    const profileImg = user.profileImage;
    const file = createReadStream(join(process.cwd(), process.env.IMAGES_PATH + profileImg));
    return new StreamableFile(file);
  };

  //helper
  async handleFiles(userId: string, fileName: string) {
    let user = await this.userService.findOne({ _id: userId });
    if (user.profileImage !== process.env.USER_DEFAULT_IMG)
      await unlink(process.env.IMAGES_PATH + user.profileImage);

    let profileImg = process.env.USER_DEFAULT_IMG;
    if (fileName)
      profileImg = fileName;

    //@ts-ignore
    await user.updateOne({ profileImage: profileImg });

    return { message: 'Done.' }
  }
}
