import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const RecipePhoto = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    return ctx.switchToHttp().getRequest().file;
  }
);
