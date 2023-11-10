import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { TokenPayload } from "../auth.service";

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('authentication'),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET_REFRESH'),
    });
  }
  async validate(payload: TokenPayload) {
    return payload;
  }
}