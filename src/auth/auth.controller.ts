import { Controller, Post, UseGuards, Request, Get, Headers, Ip, Body } from "@nestjs/common";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { RolesGuard } from "./guards/roles.guard";
import { Roles } from "./roles.decorator";
import { CreateUserDto } from "../users/dto/create-user.dto";

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {
  }

  @UseGuards(LocalAuthGuard)
  //LocalAuthGuard attach PARTIAL user to request
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('register')
  @Roles('admin')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
}
