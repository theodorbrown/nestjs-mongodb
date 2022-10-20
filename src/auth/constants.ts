import * as dotenv from "dotenv";
dotenv.config()

type Constants = {
  secret:string,
  exp: number
}

export const jwtConstants: Constants = {
  secret: process.env.SECRET_KEY_JWT,
  exp: Number(process.env.JWT_EXPIRE)
};

export const rtConstants: Constants = {
  secret: process.env.SECRET_KEY_RT,
  exp: Number(process.env.RT_EXPIRE)
};
