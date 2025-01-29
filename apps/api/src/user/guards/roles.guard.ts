import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { User } from '@prisma/client';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    );

    const user = context.switchToHttp().getRequest().user as User;

    const isAuthorized = requiredRoles.some((role) =>
      user.role?.includes(role)
    );

    if (!isAuthorized || !requiredRoles) {
      throw new HttpException('Нет Прав!', HttpStatus.FORBIDDEN);
    }

    return true;
  }
}
