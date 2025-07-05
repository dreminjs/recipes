import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserService } from '../../user';
import { ITokenPayload } from '../token.interface';
import { User } from '@prisma/client';
import { Injectable } from '@nestjs/common';


@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'RefreshTokenStrategy'
) {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          let token = null;
          if (req && req.cookies) {
            token = req.cookies['refreshToken'];
          }
          return token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('REFRESH_TOKEN'),
    });
  }

  async validate({ userId }: ITokenPayload): Promise<User> {
    return await this.userService.findOne({ id: userId });
  }
}
