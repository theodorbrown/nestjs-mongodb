import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { UsersModule } from "../users/users.module";

@Module({
  imports: [UsersModule],
  controllers: [ImagesController],
  providers: [ImagesService]
})
export class ImagesModule {}
