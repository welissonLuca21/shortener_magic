import { JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';
import { ENVS } from './envs';


export const JwtTokenSigninConfig: JwtSignOptions = {
  expiresIn: ENVS.JWT.EXPIRES_IN,
  secret: ENVS.JWT.SECRET,
};

export const JwtTokenVerifyConfig: JwtVerifyOptions = {
  secret: ENVS.JWT.SECRET,
};
