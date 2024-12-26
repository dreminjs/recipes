import { CanActivate, ExecutionContext } from '@nestjs/common';

export class SigninGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { username, password } = request.body;
    const user = await this.userService.findByUsername(username);
  }
}
