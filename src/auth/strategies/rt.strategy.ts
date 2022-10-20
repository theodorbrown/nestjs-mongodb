import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { rtConstants } from "../constants";
import { UsersService } from "../../users/users.service";
import { Request } from "express";

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'rt') {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: rtConstants.secret,
      //get back the refreshToken : I need it to hash it and put it in db
      passReqToCallback: true
    });
  }

  //payload is decoded token
  async validate(req: Request, payload: any) {
    const refreshToken = req.get('authorization').replace('Bearer','').trim();
    return {
      ...payload,
      refreshToken
    }
  }
}
