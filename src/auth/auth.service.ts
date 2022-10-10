import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { User, UserDocument } from "../users/schemas/user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) {
  }

  async validateUser(email: string, pass: string): Promise<any> {
    // @ts-ignore
    return this.userModel.getAuthenticated(email, pass);
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
