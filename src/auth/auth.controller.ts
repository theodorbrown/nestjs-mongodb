import { Controller, Post, UseGuards, Request, Body, HttpStatus, HttpCode, Res } from "@nestjs/common";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { RtAuthGuard } from "./guards/rt-auth.guard";
import { Response } from "express";

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Request() req, @Res({ passthrough: true }) response: Response) {
    const tokens = await this.authService.login(req.user);
    //TODO: Check why httpOnly works here and not in main
    response.cookie('auth-cookie', tokens, { httpOnly: true });

    return {success: true}
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logOut(@Request() req, @Res() response){
    const user = req.user;
    await this.authService.logOut(user.sub);
    response.clearCookie('auth-cookie');
    response.send({success: true})
    response.end();
  }

  @UseGuards(RtAuthGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(@Request() req, @Res({ passthrough: true }) response: Response){
    const user = req.user;
    const tokens =  await this.authService.refreshTokens(user.sub, user.refreshToken);
    //TODO: Check why httpOnly works here and not in main
    response.cookie('auth-cookie', tokens, { httpOnly: true });

    return {success: true}
  }
}
