import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { ForbiddenException, Injectable } from "@nestjs/common";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' })
  }
  //email and password from body req
  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new ForbiddenException({
        info: 'Wrong email or password'
      });
    }
    if(user.lockUntilInfo && user.loginAttemptsInfo){
      throw new ForbiddenException({
        lockUntilInfo : user.lockUntilInfo,
        loginAttemptsInfo: user.loginAttemptsInfo
      }, 'User locked');
    }
    return {
      _id: user._id,
      email: user.email
    };
  }
}
