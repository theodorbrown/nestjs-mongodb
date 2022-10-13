import { Controller, Delete, Get, Param } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./schemas/user.schema";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(":id")
  async findOneById(@Param("id") id: string): Promise<User> {
    return this.usersService.findOne({_id: id});
  }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.usersService.delete(id);
  }
}
