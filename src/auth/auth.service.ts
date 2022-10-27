import { ForbiddenException, Injectable } from "@nestjs/common";
import { User, UserDocument} from "../users/schemas/user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { jwtConstants, rtConstants } from "./constants";
import * as argon2 from "argon2";


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
    //@ts-ignore
    return this.userModel.getAuthenticated(email, pass);
  }

  //is called after guard in controller
  async login(user: any) {
    const payload = { email: user.email, sub: user._id };
    const tokens = this.getTokens(payload);

    await this.hashRt(user._id, tokens.refresh_token);

    return tokens;
  }

  async register(createUserDto: CreateUserDto) {
    const newUser = await this.userService.create(createUserDto);
    // @ts-ignore
    const payload = { email: newUser.email, sub: newUser._id };
    const tokens = this.getTokens(payload);
    // @ts-ignore
    await this.hashRt(newUser._id, tokens.refresh_token);

    return tokens;
  }

  async logOut(userId: string) {
    await this.userService.updateOne({ _id: userId }, {
      refreshToken: null
    });
  }

  async refreshTokens(userId: string, rt: string) {
    //compare le rt hash avec le has en db, si ok, on renvoie un nouveau token et rt sinon exception
    const user = await this.userService.findOne({ _id: userId });

    if (!user.refreshToken) throw new ForbiddenException('Access Denied', 'No match');
    const hashMatch = await argon2.verify(user.refreshToken, rt);
    //TODO : can't use bcryptjs for very long string/hash

    if (!hashMatch)
      throw new ForbiddenException("Access Denied", "No match");
    //@ts-ignore
    const payload = { email: user.email, sub: user._id };
    const tokens = this.getTokens(payload);
    // @ts-ignore
    await this.hashRt(user._id, tokens.refresh_token);

    return tokens;
  }

  //helper
  private getTokens(payload: any) {
    const access_token = this.jwtService.sign(payload, {
      secret: jwtConstants.secret,
      expiresIn: jwtConstants.exp
    });

    const refresh_token = this.jwtService.sign(payload, {
      secret: rtConstants.secret,
      expiresIn: rtConstants.exp
    });

    return {
      access_token,
      refresh_token
    };
  }

  //helper
  async hashRt(userId: string, rt: string) {
    const hash = await argon2.hash(rt);
    await this.userModel.updateOne({ _id: userId }, {
      refreshToken: hash
    });
  }
}
