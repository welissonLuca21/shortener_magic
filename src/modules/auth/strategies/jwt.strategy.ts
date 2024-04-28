import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ENVS } from '@config/envs';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: ENVS.JWT.SECRET,
    });
  }

  async validate(payload: any) {
    return {
      id: payload.id,
      email: payload.email,
      username: payload.email,
      expires: new Date(payload.exp * 1000).toISOString(),
      isAdmin: payload.isAdmin,
    };
  }
}
