import { Ingredient, Recipe, Step, User } from 'prisma/prisma-client';

export type IAuthResponse = Omit<
  User,
  'hashPassword' | 'salt' | 'id' | 'link' | 'role'
>;

export type IIngredient = Pick<Ingredient, 'title'>;

export type IStep = Pick<Step, 'content'>;

export interface InfiniteScrollResponse<T> {
  data: T[];
  nextCursor: number | null;
}
export interface InfiniteScrollRecipeSelectionResponse
  extends InfiniteScrollResponse<Recipe> {
  characteristicTitle: string;
  characteristicType: string;
}
