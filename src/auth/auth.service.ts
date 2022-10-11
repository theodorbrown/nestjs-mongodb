import { Injectable } from "@nestjs/common";
import { User, UserDocument } from "../users/schemas/user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import { CreateUserDto } from "../users/dto/create-user.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private userService: UsersService
  ) {
  }

  //is called by the guard
  async validateUser(email: string, pass: string): Promise<any> {
    // @ts-ignore
    return this.userModel.getAuthenticated(email, pass);
  }

  //is called after guard in controller
  async login(user: any) {
    const payload = { email: user.email, role: user.role, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: CreateUserDto){
    return this.userService.create(createUserDto);
  }
}
