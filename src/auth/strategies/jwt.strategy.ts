import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { jwtConstants } from "../constants";
import { UsersService } from "../../users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  //payload = decoded token
  async validate(payload: any) {
    //payload : email, sub, iat, exp
    //Manually check if user exist in db. Why? To be sure that user hasn't been deleted even if the token is valid.
    const usrExist = await this.usersService.findOne({ _id: payload.sub });
    if (usrExist)
      return payload;
    return usrExist;
    //req.user = usrExist
  }
}
