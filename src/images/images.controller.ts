import { Controller, Delete, Get, Header, Post, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { v4 as uuidv4 } from "uuid";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { ImagesService } from "./images.service";
//ES6 import not working :(
let path = require("path");
import * as dotenv from "dotenv";

dotenv.config()

export const storage = {
  storage: diskStorage({
    destination: process.env.IMAGES_PATH,
    filename: (req, file, cb) => {
      const filename: string = uuidv4();
      const extension: string = path.parse(file.originalname).ext;
      cb(null, `${filename}${extension}`);
    }
  })
};

@Controller("images")
export class ImagesController {
  constructor(private imageService: ImagesService) {
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor("file", storage))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req) {
    const userId = req.user.sub;
    return this.imageService.uploadFile(userId, file.filename);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  deleteFile(@Req() req) {
    const userId = req.user.sub;
    return this.imageService.deleteFile(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getFile(@Req() req){
    const userId = req.user.sub;
    return this.imageService.getFile(userId);
  }
}
