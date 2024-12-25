import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtStrategyName } from "src/constants";
import { JwtPayload } from "types";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, JwtStrategyName) {

    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
          });
    }

    async validate(payload: JwtPayload) {
        // this return to req.user
        return payload
    }
}