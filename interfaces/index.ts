import { Ingredient, Recipe, Step, User } from 'prisma/prisma-client';

export type IAuthResponse = Omit<
  User,
  'hashPassword' | 'salt' | 'id' | 'link' | 'role'
>;

export type IIngredient = Pick<Ingredient, 'title'>;

export type IStep = Pick<Step, 'content'>;

export interface RecipesResponse {
  data: Recipe[];
  nextCursor: number;
}