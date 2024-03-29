import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { rtConstants } from "../constants";
import { Request } from "express";

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'rt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          //rt from cookie
          return request?.cookies['auth-cookie']?.refresh_token
        }
      ]),
      ignoreExpiration: false,
      secretOrKey: rtConstants.secret,
      //get back the refreshToken : I need it to hash it and put it in db
      passReqToCallback: true
    });
  }

  //payload is decoded token
  async validate(req: Request, payload: any) {
    //refresh token needed for db
    const refreshToken = req.cookies['auth-cookie']?.refresh_token;
    return {
      ...payload,
      refreshToken
    }
  }
}
