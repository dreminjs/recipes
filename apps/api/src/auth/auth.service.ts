import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user';
import { SigninDto } from './dto/signin.dto';
import {
  comparePassword,
  generateHashPassword,
} from './helpers/password.helper';
import { TokenService } from '../token';
import { Roles, User } from '@prisma/client';
import { MailService } from '../mail/mail.service';
import * as speakeasy from 'speakeasy';
import { SigninTwoFaDto } from './dto/signin-2fa.dto';
import { SignupDto } from './dto/signup.dto';
import { authMessages } from './helpers/constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly mailService: MailService
  ) {}

  public async validateUser({ email, password }: SigninDto): Promise<User> {
    const user = await this.userService.findOne({
      email,
    });

    if (!user?.hashPassword) {
      throw new NotFoundException('Такого пользователя не существует!');
    }

    const isPasswordValid = comparePassword({
      hashPassword: user.hashPassword,
      password,
    });

    if (!isPasswordValid) {
      throw new UnauthorizedException('Неверный пароль!');
    }

    const token = await this.tokenService.findOne({ user: { email } });

    if (token) {
      await this.tokenService.deleteRefreshToken({ id: token.id });
    }

    return user;
  }

  public async requestTwoFactor(user: User) {
    const token = speakeasy.generateSecret({
      length: 5,
    });

    const updatedUserQuery = this.userService.updateOne(
      {
        id: user.id,
      },
      {
        twoFactorSecret: token.ascii,
      }
    );

    const mailQuery = this.mailService.sendTwoFaSecret({
      nickname: user.nickname,
      email: user.email,
      secret: token.ascii,
    });

    await Promise.all([updatedUserQuery, mailQuery]);

    return this.buildTwoFactorResponse(user);
  }

  async signup({ email, nickname, ...dto }: SignupDto): Promise<User> {
    const { hashedPassword, salt } = await generateHashPassword(dto.password);

    const link = crypto.randomUUID();

    const newUser = await this.userService.createOne({
      hashPassword: hashedPassword,
      email,
      nickname,
      salt,
      isActived: false,
      role: Roles.USER,
      link,
    });

    await this.mailService.sendConfirmationEmail({
      user: { email, nickname },
      urlConfirmAddress: link,
    });

    return newUser;
  }

  private buildTwoFactorResponse(user: User) {
    return {
      message: 'На вашу почту поступил Код!',
      success: true,
      data: {
        email: user.email,
        id: user.id,
        nickname: user.nickname,
        isActived: user.isActived,
        role: user.role,
        twoFactorSecret: user.twoFactorSecret,
        isTwoFactorEnabled: user.isTwoFactorEnabled,
      },
    };
  }

  async validate2faSignin({ email, secret }: SigninTwoFaDto): Promise<User> {
    const user = await this.userService.findOne({ email });

    if (user.twoFactorSecret !== secret) {
      throw new UnauthorizedException('Неверный код');
    }

    return user;
  }

  async checkUserExists(email: string) {
    const oldUser = await this.userService.findOne({ email });

    if (oldUser) {
      throw new BadRequestException(authMessages.userExists);
    }
  }

  async checkUserIsnotExists(email: string): Promise<User> {
    const oldUser = await this.userService.findOne({ email });

    if (!oldUser) {
      throw new BadRequestException(authMessages.userIsNotExists);
    }

    return oldUser
  }
}
