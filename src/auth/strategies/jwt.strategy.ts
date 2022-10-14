import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { jwtConstants } from "../constants";
import { UsersService } from "../../users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret
    });
  }

  //payload decoded JSON from passport
  async validate(payload: any) {
    //Manually check if user exist in db (token valid or not)
    const usrExist = await this.usersService.findOne({ _id: payload.sub });
    if (usrExist)
      //attach those infos to req
      return {
        _id: payload.sub,
        email: payload.email,
        role: payload.role
      };
    return usrExist;
  }
}
