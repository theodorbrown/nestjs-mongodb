import { Controller, Delete, Get, Param, Request, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./schemas/user.schema";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/guards/roles.guard";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get("all_for_admin")
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findOneById(@Request() req): Promise<User> {
    const userId = req.user._id;
    return this.usersService.findOne({_id: userId});
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.usersService.delete(id);
  }
}
